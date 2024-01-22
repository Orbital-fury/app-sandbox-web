import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadSinglePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingSinglePcElement, selectSinglePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-pc-element',
  templateUrl: './pc-element.component.html',
  styleUrls: ['./pc-element.component.scss']
})
export class PcElementComponent implements OnInit, OnDestroy {

  pcElement: PcElement;
  loadingSinglePcElement: boolean;

  private elementId: number = parseInt(this.route.snapshot.paramMap.get('elementId')!);
  private subs = new SubSink();

  constructor(private readonly route: ActivatedRoute, private readonly pcElementStore: Store<PcElementsState>) { }

  ngOnInit() {
    this.subs.sink = this.pcElementStore.select(selectSinglePcElement)
      .pipe(filter(data => data !== undefined))
      .subscribe(data => this.pcElement = data!);
    this.subs.sink = this.pcElementStore.select(selectLoadingSinglePcElement)
      .subscribe(loading => this.loadingSinglePcElement = loading);

    this.pcElementStore.dispatch(loadSinglePcElement({ pcElementId: this.elementId }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
