import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementChoiceService } from 'src/app/services/pc-builder/element-choice.service';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementType, PcElement } from 'src/typing-pc-builder';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss']
})
export class PCBuilderComponent implements OnInit, OnDestroy {
  private subscriptionElementType: Subscription;
  selectedElementType: ElementType;
  private subscriptionPcElement: Subscription;

  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  choosenPcElements: PcElement[] = [];
  totalPrice: number = 0;

  constructor(
    private pcElementService: PcElementService,
    private elementTypeChoiceService: ElementTypeChoiceService,
    private pcElementChoiceService: ElementChoiceService
  ) {
    this.subscriptionElementType = this.elementTypeChoiceService.selectedElementType$.subscribe(elementType => {
      this.selectedElementType = elementType;
      this.getPcElementsOfChoosenType();
    });
    this.subscriptionPcElement = this.pcElementChoiceService.selectedPcElement$.subscribe(pcElement => {
      if (pcElement) {
        this.choosenPcElements.push(pcElement);
        this.totalPrice += pcElement.price;
      }
    });
  }

  ngOnInit(): void {
    this.elementTypeChoiceService.setSelectedElementType('CPU')
    this.pcElementService.getPcElements().subscribe((data) => {
      this.pcElements = data;
      this.getPcElementsOfChoosenType();
    });
  }

  ngOnDestroy() {
    this.subscriptionElementType.unsubscribe();
  }

  private getPcElementsOfChoosenType() {
    this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementType);
  }

}
