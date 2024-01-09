import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { PcElement } from 'src/typing-pc-builder';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss']
})
export class PCBuilderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  selectedButton: string;

  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];

  constructor(private pcElementService: PcElementService, private buttonStateService: ElementTypeChoiceService) {
    this.subscription = this.buttonStateService.selectedButton$.subscribe(buttonName => {
      this.selectedButton = buttonName;
      this.getPcElementsOfChoosenType();
    });
  }

  ngOnInit(): void {
    this.buttonStateService.setSelectedButton('CPU')
    this.pcElementService.getPcElements().subscribe((data) => {
      // this.pcElements = data;
      var num: number = 0;
      var i: number;
      for (i = num; i <= 30; i++) {
        this.pcElements.push(data[0]);
      }

      this.getPcElementsOfChoosenType();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getPcElementsOfChoosenType() {
    this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedButton);
  }

}
