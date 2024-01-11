import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementChoiceService } from 'src/app/services/pc-builder/element-choice.service';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementType, ElementTypeInfo, PcElement } from 'src/typing-pc-builder';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss']
})
export class PCBuilderComponent implements OnInit, OnDestroy {
  private subscriptionElementType: Subscription;
  selectedElementTypeInfo: ElementTypeInfo;
  private subscriptionPcElement: Subscription;

  elementTypeChoices: ElementTypeInfo[] = [
    { name: "CPU", code: "CPU", isPcElementSelected: false }, 
    { name: "Case", code: "CASE", isPcElementSelected: false }, 
    { name: "GPU", code: "GPU", isPcElementSelected: false }, 
    { name: "Motherboard", code: "MOBO", isPcElementSelected: false },
    { name: "RAM", code: "RAM", isPcElementSelected: false }, 
    { name: "Power supply", code: "POWER", isPcElementSelected: false }, 
    { name: "Storage", code: "STORAGE", isPcElementSelected: false }, 
    { name: "Cooling system", code: "COOLING", isPcElementSelected: false }
  ]
  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  choosenPcElements: PcElement[] = [];
  totalPrice: number = 0;

  constructor(
    private pcElementService: PcElementService,
    private elementTypeChoiceService: ElementTypeChoiceService,
    private pcElementChoiceService: ElementChoiceService
  ) {
    
  }

  ngOnInit(): void {
    this.subscriptionElementType = this.elementTypeChoiceService.selectedElementType$.subscribe(elementType => {
      this.selectedElementTypeInfo = elementType;
      this.getPcElementsOfChoosenType();
    });
    this.subscriptionPcElement = this.pcElementChoiceService.selectedPcElement$.subscribe(pcElement => {
      if (pcElement) {
        this.choosenPcElements.push(pcElement);
        this.totalPrice += pcElement.price;
        var elementTypeChoice = this.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === pcElement.type);
        if (elementTypeChoice) {
          elementTypeChoice.isPcElementSelected = true;
        }
      }
    });
    this.elementTypeChoiceService.setSelectedElementType(this.elementTypeChoices[0])
    this.pcElementService.getPcElements().subscribe((data) => {
      this.pcElements = data;
      this.getPcElementsOfChoosenType();
    });
  }

  ngOnDestroy() {
    this.subscriptionElementType.unsubscribe();
    this.subscriptionPcElement.unsubscribe();
  }

  private getPcElementsOfChoosenType() {
    this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code);
  }

}
