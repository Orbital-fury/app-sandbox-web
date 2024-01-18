import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PcBuilderStore } from 'src/app/store/component-store/pc-builder.store';
import { PcElement } from 'src/typing-pc-builder';

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

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnInit() {
    this.pcBuilderStore.selectPcBuildElements$.subscribe(pcBuildElements => {
      this.isInBuild = pcBuildElements.includes(this.pcElement);
      this.canBeAdded = pcBuildElements.find(pcBuildElement => pcBuildElement.type === this.pcElement.type) === undefined;
    });
  }

  ngOnDestroy() { }

  addPcElementToBuild() {
    if (this.canBeAdded) {
      this.pcBuilderStore.addPcElementToBuild(this.pcElement);
    }
  }

  seeMoreClick(event: MouseEvent, seeMore: boolean) {
    this.seeMore = seeMore;
    event.preventDefault();
    event.stopPropagation();
  }

}
