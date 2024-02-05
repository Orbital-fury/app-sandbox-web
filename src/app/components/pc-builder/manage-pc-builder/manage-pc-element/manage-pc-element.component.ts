import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { loadPcElements } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingPcElements, selectPcElements } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement, PcElementBasis } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';
import { ModalDeletePcElementComponent } from './modal-delete-pc-element/modal-delete-pc-element.component';

@Component({
  selector: 'app-manage-pc-element',
  templateUrl: './manage-pc-element.component.html',
  styleUrls: ['./manage-pc-element.component.scss']
})
export class ManagePcElementComponent implements OnInit, OnDestroy {

  pcElements: PcElement[] = [];
  loadingPcElements: boolean;
  private subs = new SubSink();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private readonly pcElementStore: Store<PcElementsState>
  ) { }

  ngOnInit() {
    this.subs.sink = this.pcElementStore.select(selectPcElements).subscribe(pcElements => this.pcElements = pcElements);
    this.subs.sink = this.pcElementStore.select(selectLoadingPcElements).subscribe(loading => this.loadingPcElements = loading);

    this.pcElementStore.dispatch(loadPcElements());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  goToAddPcElement() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  deletePcElement(pcElement: PcElementBasis) {
    const modalRef = this.modalService.open(ModalDeletePcElementComponent, { centered: true, scrollable: true });
    modalRef.componentInstance.pcElement = pcElement;
  }

}
