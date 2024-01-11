import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { ElementType, ElementTypeInfo } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent implements OnInit, OnDestroy {
  @Input() elementTypeInfo: ElementTypeInfo;
  isElementTypeSelected: boolean = false;

  private subscriptionElementType: Subscription;

  constructor(private elementTypeChoiceService: ElementTypeChoiceService) { }

  ngOnInit(): void {
    this.subscriptionElementType = this.elementTypeChoiceService.selectedElementType$.subscribe(elementType => {
      this.isElementTypeSelected = elementType === this.elementTypeInfo;
    });
  }

  ngOnDestroy() {
    this.subscriptionElementType.unsubscribe();
  }

  selectElementType() {
    this.elementTypeChoiceService.setSelectedElementType(this.elementTypeInfo);
  }
  
}
