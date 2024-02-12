import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeSelectedPcElementType } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectPcBuildElements, selectSelectedPcElementType } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElementType } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent implements OnInit, OnDestroy {
  @Input() elementTypeInfo: PcElementType;

  isElementTypeSelected: boolean; // bar extended to display the selection of type
  isElementTypeInBuild: boolean = true; // switch between blue and green to display unselected or seleted  type in build

  private subs = new SubSink();

  constructor(private readonly pcElementsStore: Store<PcElementsState>) { }

  ngOnInit() {
    this.isElementTypeSelected = this.elementTypeInfo.code === "CPU";

    this.subs.sink = this.pcElementsStore.select(selectPcBuildElements).subscribe(pcBuildElements =>
      this.isElementTypeInBuild = pcBuildElements.find(pcBuildElement => pcBuildElement.type.code === this.elementTypeInfo.code) !== undefined
    );

    this.subs.sink = this.pcElementsStore.select(selectSelectedPcElementType).subscribe(selectedElementType =>
      this.isElementTypeSelected = selectedElementType === this.elementTypeInfo.code
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  selectElementType() {
    this.pcElementsStore.dispatch(changeSelectedPcElementType({ pcElementType: this.elementTypeInfo.code }));
  }

}
