import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementTypeInfo, PcConstraint, PcElement } from 'src/typing-pc-builder';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss'],
  providers: [PcBuilderStore]
})
export class PCBuilderComponent implements OnInit, OnDestroy {

  selectedElementTypeInfo: ElementTypeInfo;
  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  pcBuildElements: PcElement[] = [];
  totalPrice: number = 0;
  elementTypeChoices: ElementTypeInfo[] = [];

  constructor(
    private pcElementService: PcElementService,
    private readonly pcBuilderStore: PcBuilderStore
  ) { }

  ngOnInit(): void {
    this.pcElementService.getPcElements().subscribe(pcElements => {
      this.pcElements = pcElements;
      this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code);
    });

    combineLatest([
      this.pcBuilderStore.selectSelectedElementTypeInfo$,
      this.pcBuilderStore.selectPcBuildElements$
    ]).subscribe(([selectedElementTypeInfo, pcBuildElements]) => {
      this.selectedElementTypeInfo = selectedElementTypeInfo;
      this.pcBuildElements = pcBuildElements;
      this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
      this.pcElementsOfChoosenType = this.getPcElementsWithConstraints(pcBuildElements).filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code);
    });

    this.pcBuilderStore.selectElementTypeChoices$.subscribe(elementTypeChoices => this.elementTypeChoices = elementTypeChoices);
  }

  ngOnDestroy() { }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.pcBuilderStore.removePcElementFromBuild(removedPcElement);
  }

  private getPcElementsWithConstraints(pcBuildElements: PcElement[]): PcElement[] {
    console.log(new Date().toISOString());
    const pcBuildConstraints = this.getPcConstraintsfromPcElements(pcBuildElements);
    return this.pcElements.filter(pcElement => this.canBeAddedRegardingConstraints(pcElement, pcBuildConstraints));
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

  private canBeAddedRegardingConstraints(pcElement: PcElement, pcBuildConstraints: PcConstraint[]): boolean {
    const canBeAdded: boolean = pcElement.constraints.every((constraint) => {
      const pcBuildConstraintToManage: PcConstraint | undefined = pcBuildConstraints.find(
        (buildConstraint) => buildConstraint.code === constraint.code
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
    console.log("manage PC element : ", new Date().toISOString());
    return canBeAdded;
  }

}
