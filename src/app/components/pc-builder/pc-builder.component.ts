import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementTypeInfo, PcConstraint, PcElement, PcElementType } from 'src/typing-pc-builder';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss'],
  providers: [PcBuilderStore]
})
export class PCBuilderComponent implements OnInit, OnDestroy {

  selectedElementType: PcElementType;
  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  pcBuildElements: PcElement[] = [];
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
  isTypeInBuild: boolean = true; // switch between blue and green to display unselected or seleted  type in build

  constructor(
    private pcElementService: PcElementService,
    private readonly pcBuilderStore: PcBuilderStore
  ) { }

  ngOnInit(): void {
    this.pcElementService.getPcElements().subscribe(pcElements => {
      this.pcElements = pcElements;
      this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementType);
    });

    combineLatest([
      this.pcBuilderStore.selectSelectedElementType$,
      this.pcBuilderStore.selectPcBuildElements$
    ]).subscribe(([selectedElementTypeInfo, pcBuildElements]) => {
      this.selectedElementType = selectedElementTypeInfo;
      this.pcBuildElements = pcBuildElements;
      this.isTypeInBuild = this.pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.selectedElementType) !== undefined
      this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
      this.pcElementsOfChoosenType = this.getPcElementsWithConstraints().filter(pcElement => pcElement.type === this.selectedElementType);
    });

  }

  ngOnDestroy() { }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.pcBuilderStore.removePcElementFromBuild(removedPcElement);
  }

  private getPcElementsWithConstraints(): PcElement[] {
    console.log(new Date().toISOString());
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
    const pcElementsToLookAt = this.pcBuildElements.filter(pcBuildElement =>
      pcBuildElement.type !== this.selectedElementType
    );
    const pcBuildConstraints = this.getPcConstraintsfromPcElements(pcElementsToLookAt);

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
    console.log("manage PC element : ", new Date().toISOString());
    return canBeAdded;
  }

}
