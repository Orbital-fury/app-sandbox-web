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
  isElementTypeSelected: boolean = false; // bar extended to display the selection of type
  isTypeInBuild: boolean = true; // switch between blue and green to display unselected or seleted  type in build

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnInit(): void {
    this.pcBuilderStore.selectSelectedElementType$.subscribe(elementType =>
      this.isElementTypeSelected = elementType === this.elementTypeInfo.code
    );
    this.pcBuilderStore.selectPcBuildElements$.subscribe(pcBuildElements =>
      this.isTypeInBuild = pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.elementTypeInfo.code) !== undefined
    );
  }

  ngOnDestroy() { }

  selectElementType() {
    this.pcBuilderStore.patchState({ selectedElementType: this.elementTypeInfo.code });
  }

}
