import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { loadPcElements, removePcElementFromBuild } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingPcElements, selectPcBuildElements, selectPcElements } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { ElementTypeInfo, PcConstraint, PcElement, PcElementType } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss'],
  providers: [PcBuilderStore]
})
export class PCBuilderComponent implements OnInit, OnDestroy {

  loadingPcElements: boolean;
  selectedElementType: PcElementType = "CPU";
  pcBuildElements: PcElement[] = []; // PC elements displayed in PC build
  pcElements: PcElement[] = []; // needed to filter on the global pcElements
  pcElementsOfChoosenType: PcElement[] = []; // PC elements displayed for selection
  totalPrice: number = 0;
  elementTypeChoices: ElementTypeInfo[] = [
    { name: "CPU", code: "CPU" },
    { name: "Case", code: "CASE" },
    { name: "GPU", code: "GPU" },
    { name: "Motherboard", code: "MOBO" },
    { name: "RAM", code: "RAM" },
    { name: "Power supply", code: "POWER" },
    { name: "Storage", code: "STORAGE" },
    { name: "Cooling system", code: "COOLING" }
  ];
  mapElementTypeChoices: Map<PcElementType, PcElement[]>;
  isCurrentElementTypeInBuild: boolean = false;

  private subs = new SubSink();

  constructor(
    private readonly pcElementStore: Store<PcElementsState>,
    private elementTypeChoiceService: ElementTypeChoiceService
  ) { }

  ngOnInit() {
    this.mapElementTypeChoices = new Map<PcElementType, PcElement[]>(
      this.elementTypeChoices.map(elementType => [elementType.code, []])
    );

    this.subs.sink = this.pcElementStore.select(selectLoadingPcElements).subscribe(loading => this.loadingPcElements = loading);
    this.subs.sink = this.pcElementStore.select(selectPcElements).subscribe(pcElements => {
      this.pcElements = pcElements
      this.updateMapElementTypeChoices(this.pcElements);
      this.updatePcElementSelection();
    });

    this.subs.sink = this.pcElementStore.select(selectPcBuildElements).subscribe(pcBuildElements => {
      this.pcBuildElements = pcBuildElements;
      this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
      this.updateMapElementTypeChoices(this.getPcElementsWithConstraints());
      this.updatePcElementSelection();
    });

    this.elementTypeChoiceService.selectedElementType$.subscribe(selectedElementType => {
      this.selectedElementType = selectedElementType;
      this.updatePcElementSelection();
    });

    this.pcElementStore.dispatch(loadPcElements());
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.pcElementStore.dispatch(removePcElementFromBuild({ pcElement: removedPcElement }))
  }

  private updatePcElementSelection() {
    this.pcElementsOfChoosenType = this.mapElementTypeChoices.get(this.selectedElementType)!;
    this.isCurrentElementTypeInBuild = this.pcBuildElements.map(pcBuildElement => pcBuildElement.type).includes(this.selectedElementType);
  }

  private updateMapElementTypeChoices(fileteredPcElements: PcElement[]) {
    this.mapElementTypeChoices.clear()
    this.elementTypeChoices.forEach(
      elementTypeChoice => {
        this.mapElementTypeChoices.set(
          elementTypeChoice.code,
          fileteredPcElements.filter(pcElement => pcElement.type === elementTypeChoice.code))
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
          constraintMap.set(key, { ...constraint, value: [] });
        }
        constraintMap.get(key)!.value.push(...constraint.value);
      });
    return Array.from(constraintMap.values());
  }

  private canBeAddedRegardingConstraints(pcElement: PcElement): boolean {
    const pcBuildElementsOfOtherType = this.pcBuildElements.filter(pcBuildElement =>
      pcBuildElement.type !== pcElement.type
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
          return pcBuildConstraintToManage.value.some((valueFromBuildToManage) => {
            return constraint.value.includes(valueFromBuildToManage);
          });
        case 'MAX':
          return parseFloat(pcBuildConstraintToManage.value[0]) >= parseFloat(constraint.value[0]);
        case 'CAPACITY':
          // Gestion du cas CAPACITY
          return true;
        case 'LIMIT':
          return parseFloat(pcBuildConstraintToManage.value[0]) <= parseFloat(constraint.value[0]);
        default:
          return false; // Au cas où une nouvelle valeur de type serait ajoutée
      }
    });
    return canBeAdded;
  }

}
