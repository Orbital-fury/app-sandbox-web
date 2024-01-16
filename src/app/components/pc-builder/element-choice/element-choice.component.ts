import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PcBuilderStore } from 'src/app/store/component-store/pc-builder.store';
import { PcElement } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-choice',
  templateUrl: './element-choice.component.html',
  styleUrls: ['./element-choice.component.scss']
})
export class ElementChoiceComponent implements OnDestroy {
  @Input()
  pcElement: PcElement;
  seeMore: boolean = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private readonly pcBuilderStore: PcBuilderStore) { }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  addPcElementToBuild() {
    this.pcBuilderStore.selectSelectedElementTypeInfo$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(elementTypeInfo => {
        if (!elementTypeInfo.isPcElementSelected) {
          this.pcBuilderStore.addPcElementToBuild(this.pcElement);
        }
      });
  }

  seeMoreClick(event: MouseEvent, seeMore: boolean) {
    this.seeMore = seeMore;
    event.preventDefault();
    event.stopPropagation();
  }

}
