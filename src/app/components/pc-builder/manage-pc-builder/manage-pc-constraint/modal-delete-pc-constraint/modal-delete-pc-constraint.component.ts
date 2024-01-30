import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-pc-constraint',
  templateUrl: './modal-delete-pc-constraint.component.html',
  styleUrls: ['./modal-delete-pc-constraint.component.scss']
})
export class ModalDeletePcConstraintComponent {
  @Input() constraintId: number;

  constructor(private activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }

}
