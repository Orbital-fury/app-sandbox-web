import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PcBuilderStore } from 'src/app/store/component-store/pc-builder.store';
import { ElementTypeInfo } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent implements OnInit, OnDestroy {
  @Input() elementTypeInfo: ElementTypeInfo;
  isElementTypeSelected: boolean = false;

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnInit(): void {
    this.pcBuilderStore.selectSelectedElementTypeInfo$.subscribe(elementTypeInfo =>
      this.isElementTypeSelected = elementTypeInfo.code === this.elementTypeInfo.code
    )
  }

  ngOnDestroy() { }

  selectElementType() {
    this.pcBuilderStore.patchState({ selectedElementTypeInfo: this.elementTypeInfo });
  }

}
