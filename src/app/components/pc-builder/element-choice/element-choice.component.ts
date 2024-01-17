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
  canBeAdded: boolean;

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnInit() {
    this.pcBuilderStore.selectElementTypeChoices$
      .subscribe(elementTypeChoices => {
        this.canBeAdded = !elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === this.pcElement.type)!.isPcElementSelected
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
