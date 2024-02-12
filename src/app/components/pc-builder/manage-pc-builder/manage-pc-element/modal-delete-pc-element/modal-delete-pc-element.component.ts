import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { deletePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement, PcElementBasis } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-modal-delete-pc-element',
  templateUrl: './modal-delete-pc-element.component.html',
  styleUrls: ['./modal-delete-pc-element.component.scss']
})
export class ModalDeletePcElementComponent {

  @Input() pcElement: PcElement;

  loadingPcElement: boolean;
  deleteSecurity: string = "Delete the PC element!";
  deleteSecurityInput: string;

  private subs = new SubSink();

  constructor(private activeModal: NgbActiveModal, private readonly pcElementStore: Store<PcElementsState>) { }

  close() {
    this.activeModal.close();
  }

  delete() {
    this.pcElementStore.dispatch(deletePcElement({ pcElementId: this.pcElement.id }));
    this.activeModal.close();
  }

}
