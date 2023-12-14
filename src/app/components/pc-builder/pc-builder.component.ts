import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss']
})
export class PCBuilderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  selectedButton: string;

  constructor(private buttonStateService: ElementTypeChoiceService) {
    this.subscription = this.buttonStateService.selectedButton$.subscribe(buttonName => {
      this.selectedButton = buttonName;
    });
  }

  ngOnInit(): void {
    this.buttonStateService.setSelectedButton('CPU')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
