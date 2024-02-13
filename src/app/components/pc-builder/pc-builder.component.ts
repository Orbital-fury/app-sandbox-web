import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPcElementTypes } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.actions';
import { selectLoadingPcElementTypes, selectPcElementTypes } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.selectors';
import { PcElementTypesState } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.state';
import { loadPcElements, removePcElementFromBuild } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingPcElements, selectPcBuildElements, selectPcElements, selectSelectedPcElementType } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcConstraint, PcElement, PcElementType, PcElementTypeEnum } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-pc-builder',
    templateUrl: './pc-builder.component.html',
    styleUrls: ['./pc-builder.component.scss'],
    providers: [PcBuilderStore]
})
export class PcBuilderComponent implements OnInit, OnDestroy {

    loadingPcElements: boolean;
    pcBuildElements: PcElement[] = []; // PC elements displayed in PC build
    pcElementsOfChoosenType: PcElement[] = []; // PC elements displayed for selection
    totalPrice: number = 0;
    loadingPcElementTypes: boolean;
    elementTypeChoices: PcElementType[] = [];
    isCurrentElementTypeInBuild: boolean = false;

    private selectedElementType: PcElementTypeEnum;
    private pcElements: PcElement[] = []; // needed to filter on the global pcElements
    private mapElementTypeChoices: Map<PcElementTypeEnum, PcElement[]> = new Map<PcElementTypeEnum, PcElement[]>();
    private subs = new SubSink();

    constructor(private readonly pcElementStore: Store<PcElementsState>, private readonly pcElementTypeStore: Store<PcElementTypesState>) { }

    ngOnInit() {

        this.subs.sink = this.pcElementTypeStore.select(selectLoadingPcElementTypes).subscribe(loading => this.loadingPcElementTypes = loading);
        this.subs.sink = this.pcElementStore.select(selectLoadingPcElements).subscribe(loading => this.loadingPcElements = loading);

        this.subs.sink = combineLatest([
            this.pcElementStore.select(selectPcElements),
            this.pcElementTypeStore.select(selectPcElementTypes)
        ]).subscribe(([pcElements, pcElementTypes]) => {
            this.elementTypeChoices = pcElementTypes;
            this.mapElementTypeChoices = new Map<PcElementTypeEnum, PcElement[]>(
                this.elementTypeChoices.map(elementType => [elementType.code, []])
            );

            this.pcElements = pcElements
            if (this.pcBuildElements.length === 0) {
                this.updateMapElementTypeChoices(this.pcElements);
                this.updatePcElementSelection();
            }
        });

        this.subs.sink = this.pcElementStore.select(selectPcBuildElements).subscribe(pcBuildElements => {
            this.pcBuildElements = pcBuildElements;
            this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
            this.updateMapElementTypeChoices(this.getPcElementsWithConstraints());
            this.updatePcElementSelection();
        });

        this.subs.sink = this.pcElementStore.select(selectSelectedPcElementType).subscribe(selectedElementType => {
            this.selectedElementType = selectedElementType;
            this.updatePcElementSelection();
        })

        this.pcElementStore.dispatch(loadPcElements());
        this.pcElementTypeStore.dispatch(loadPcElementTypes());
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }

    removeElementFromChoosen(removedPcElement: PcElement) {
        this.pcElementStore.dispatch(removePcElementFromBuild({ pcElement: removedPcElement }))
    }

    private updatePcElementSelection() {
        this.pcElementsOfChoosenType = this.mapElementTypeChoices.get(this.selectedElementType)!;
        this.isCurrentElementTypeInBuild = this.pcBuildElements.map(pcBuildElement => pcBuildElement.type.code).includes(this.selectedElementType);
        console.log('pcElementsOfChoosenType', this.pcElementsOfChoosenType)
        console.log('mapElementTypeChoices', this.mapElementTypeChoices)
    }

    private updateMapElementTypeChoices(fileteredPcElements: PcElement[]) {
        this.mapElementTypeChoices.clear()
        this.elementTypeChoices.forEach(
            elementTypeChoice => {
                this.mapElementTypeChoices.set(
                    elementTypeChoice.code,
                    fileteredPcElements.filter(pcElement => pcElement.type.code === elementTypeChoice.code))
            }
        );
    }

    private getPcElementsWithConstraints(): PcElement[] {
        return this.pcElements.filter(pcElement => this.canBeAddedRegardingConstraints(pcElement));
    }

    private getPcConstraintsfromPcElements(pcElements: PcElement[]): PcConstraint[] {
        const constraintMap = new Map<string, PcConstraint>();
        pcElements.flatMap(pcElement => pcElement.constraints)
            .forEach(constraint => {
                const key = constraint.code; // Utilisez constraint.id si vous préférez l'id
                if (!constraintMap.has(key)) {
                    constraintMap.set(key, { ...constraint, values: [] });
                }
                constraintMap.get(key)!.values.push(...constraint.values);
            });
        return Array.from(constraintMap.values());
    }

    private canBeAddedRegardingConstraints(pcElement: PcElement): boolean {
        const pcBuildElementsOfOtherType = this.pcBuildElements.filter(pcBuildElement =>
            pcBuildElement.type.code !== pcElement.type.code
        );
        const pcBuildConstraints = this.getPcConstraintsfromPcElements(pcBuildElementsOfOtherType);

        const canBeAdded: boolean = pcElement.constraints.every((constraint) => {
            const pcBuildConstraintToManage = pcBuildConstraints.find(buildConstraint =>
                buildConstraint.code === constraint.code
            );

            if (!pcBuildConstraintToManage) {
                return true; // Contrainte non présente, donc valide
            }

            switch (pcBuildConstraintToManage.type) {
                case 'SAME':
                    return pcBuildConstraintToManage.values.some((valueFromBuildToManage) => {
                        return constraint.values.includes(valueFromBuildToManage);
                    });
                case 'MAX':
                    return parseFloat(pcBuildConstraintToManage.values[0]) >= parseFloat(constraint.values[0]);
                case 'CAPACITY':
                    // Gestion du cas CAPACITY
                    return true;
                case 'LIMIT':
                    return parseFloat(pcBuildConstraintToManage.values[0]) <= parseFloat(constraint.values[0]);
                default:
                    return false; // Au cas où une nouvelle valeur de type serait ajoutée
            }
        });
        return canBeAdded;
    }

}
