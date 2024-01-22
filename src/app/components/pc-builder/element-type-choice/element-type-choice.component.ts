import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { selectPcBuildElements } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { ElementTypeInfo } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent implements OnInit, OnDestroy {
  @Input() elementTypeInfo: ElementTypeInfo;

  isElementTypeSelected: boolean; // bar extended to display the selection of type
  isElementTypeInBuild: boolean = true; // switch between blue and green to display unselected or seleted  type in build

  private subs = new SubSink();

  constructor(
    private readonly pcElementsStore: Store<PcElementsState>,
    private elementTypeChoiceService: ElementTypeChoiceService
  ) { }

  ngOnInit() {
    this.isElementTypeSelected = this.elementTypeInfo.code === "CPU";

    this.subs.sink = this.pcElementsStore.select(selectPcBuildElements).subscribe(pcBuildElements =>
      this.isElementTypeInBuild = pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.elementTypeInfo.code) !== undefined
    );

    this.elementTypeChoiceService.selectedElementType$.subscribe(selectedType => {
      this.isElementTypeSelected = selectedType === this.elementTypeInfo.code
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  selectElementType() {
    this.elementTypeChoiceService.notifySelectedElementType(this.elementTypeInfo.code);
  }

}
