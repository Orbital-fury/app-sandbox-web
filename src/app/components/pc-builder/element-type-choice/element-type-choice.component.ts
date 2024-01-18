import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { PcBuilderStore } from 'src/app/store/component-store/pc-builder.store';
import { ElementTypeInfo } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent implements OnInit, OnDestroy {
  @Input() elementTypeInfo: ElementTypeInfo;

  isElementTypeSelected: boolean; // bar extended to display the selection of type
  isElementTypeInBuild: boolean = true; // switch between blue and green to display unselected or seleted  type in build

  constructor(
    private readonly pcBuilderStore: PcBuilderStore,
    private elementTypeChoiceService: ElementTypeChoiceService
  ) { }

  ngOnInit() {
    this.isElementTypeSelected = this.elementTypeInfo.code === "CPU";

    this.pcBuilderStore.selectPcBuildElements$.subscribe(pcBuildElements =>
      this.isElementTypeInBuild = pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.elementTypeInfo.code) !== undefined
    );
    this.elementTypeChoiceService.selectedElementType$.subscribe(selectedType => {
      this.isElementTypeSelected = selectedType === this.elementTypeInfo.code
    });
  }

  ngOnDestroy() { }

  selectElementType() {
    this.elementTypeChoiceService.notifySelectedElementType(this.elementTypeInfo.code);
  }

}
