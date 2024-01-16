import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { PcBuilderStore } from 'src/app/store/component-store/pc-builder.store';
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

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnInit(): void {
    // this.subscriptionElementType = this.elementTypeChoiceService.selectedElementType$.subscribe(elementType => {
    //   this.isElementTypeSelected = elementType === this.elementTypeInfo;
    // });
    this.pcBuilderStore.selectSelectedElementTypeInfo$.subscribe(elementTypeInfo =>
      this.isElementTypeSelected = elementTypeInfo.code === this.elementTypeInfo.code
    )
  }

  ngOnDestroy() {
    // this.subscriptionElementType.unsubscribe();
  }

  selectElementType() {
    this.pcBuilderStore.patchState({selectedElementTypeInfo: this.elementTypeInfo});
    // this.elementTypeChoiceService.setSelectedElementType(this.elementTypeInfo);
  }

}
