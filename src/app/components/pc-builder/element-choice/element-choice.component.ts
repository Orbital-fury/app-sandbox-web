import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPcElementToBuild } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectPcBuildElements } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-element-choice',
  templateUrl: './element-choice.component.html',
  styleUrls: ['./element-choice.component.scss']
})
export class ElementChoiceComponent implements OnInit, OnDestroy {
  @Input()
  pcElement: PcElement;
  seeMore: boolean = false;
  canBeAdded: boolean = true;
  isInBuild: boolean = false;

  private subs = new SubSink();

  constructor(private readonly pcElementsStore: Store<PcElementsState>) { }

  ngOnInit() {
    this.subs.sink = this.pcElementsStore.select(selectPcBuildElements).subscribe(pcBuildElements => {
      this.isInBuild = pcBuildElements.includes(this.pcElement);
      this.canBeAdded = pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.pcElement.type) === undefined;
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addPcElementToBuild() {
    if (this.canBeAdded) {
      this.pcElementsStore.dispatch(addPcElementToBuild({ pcElement: this.pcElement }));
    }
  }

  seeMoreClick(event: MouseEvent, seeMore: boolean) {
    this.seeMore = seeMore;
    event.preventDefault();
    event.stopPropagation();
  }

}
