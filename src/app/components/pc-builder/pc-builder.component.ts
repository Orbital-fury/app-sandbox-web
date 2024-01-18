import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, startWith } from 'rxjs';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
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

  selectedElementType: PcElementType = "CPU";
  pcElements: PcElement[] = [];
  filetredPcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  pcBuildElements: PcElement[] = [];
  totalPrice: number = 0;
  elementTypeChoices: ElementTypeInfo[] = [
    { name: "CPU", code: "CPU", pcElements: [] },
    { name: "Case", code: "CASE", pcElements: [] },
    { name: "GPU", code: "GPU", pcElements: [] },
    { name: "Motherboard", code: "MOBO", pcElements: [] },
    { name: "RAM", code: "RAM", pcElements: [] },
    { name: "Power supply", code: "POWER", pcElements: [] },
    { name: "Storage", code: "STORAGE", pcElements: [] },
    { name: "Cooling system", code: "COOLING", pcElements: [] }
  ];
  isCurrentElementTypeInBuild: boolean = false;

  constructor(
    private pcElementService: PcElementService,
    private readonly pcBuilderStore: PcBuilderStore,
    private elementTypeChoiceService: ElementTypeChoiceService
  ) { }

  ngOnInit() {
    this.pcElementService.getPcElements().subscribe(pcElements => {
      this.pcElements = pcElements;
      this.filetredPcElements = pcElements;
      this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementType);
    });

    combineLatest([
      this.pcBuilderStore.selectPcBuildElements$.pipe(startWith(this.pcBuildElements)),
      this.elementTypeChoiceService.selectedElementType$.pipe(startWith(this.selectedElementType))
    ]).subscribe(([pcBuildElements, selectedElementType]) => {
      this.pcBuildElements = pcBuildElements;
      this.selectedElementType = selectedElementType;
      this.filetredPcElements = this.getPcElementsWithConstraints();
      this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
      this.pcElementsOfChoosenType = this.filetredPcElements.filter(pcElement => pcElement.type === this.selectedElementType);
      this.isCurrentElementTypeInBuild = this.pcBuildElements.map(pcBuildElement => pcBuildElement.type).includes(this.selectedElementType);
    });
  }

  ngOnDestroy() { this.pcBuilderStore.destroy$ }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.pcBuilderStore.removePcElementFromBuild(removedPcElement);
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
      pcBuildElement.type !== this.selectedElementType
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
