import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { deletePcConstraint, loadPcElementsConstraintValues } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.actions';
import { selectLoadingPcElementsConstraintValues, selectPcElementsConstraintValues } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.selectors';
import { PcConstraintsState } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.state';
import { PcConstraintWithoutValue, PcElementConstraintValues } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-modal-delete-pc-constraint',
  templateUrl: './modal-delete-pc-constraint.component.html',
  styleUrls: ['./modal-delete-pc-constraint.component.scss']
})
export class ModalDeletePcConstraintComponent implements OnInit, OnDestroy {
  @Input() pcConstraint: PcConstraintWithoutValue;

  loadingPcElementsConstraintValues: boolean;
  pcElementsConstraintValues: PcElementConstraintValues[] = [];
  deleteSecurity: string = "Delete the constraint!";
  deleteSecurityInput: string;

  private subs = new SubSink();

  constructor(private activeModal: NgbActiveModal, private readonly pcConstraintStore: Store<PcConstraintsState>) { }

  ngOnInit() {
    this.subs.sink = this.pcConstraintStore.select(selectLoadingPcElementsConstraintValues).subscribe(loading => this.loadingPcElementsConstraintValues = loading);
    this.subs.sink = this.pcConstraintStore.select(selectPcElementsConstraintValues)
      .subscribe(pcElementsConstraintValues => this.pcElementsConstraintValues = pcElementsConstraintValues);

    this.pcConstraintStore.dispatch(loadPcElementsConstraintValues({ pcConstraintId: this.pcConstraint.id }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  close() {
    this.activeModal.close();
  }

  delete() {
    this.pcConstraintStore.dispatch(deletePcConstraint({ pcConstraintId: this.pcConstraint.id }));
    this.activeModal.close();
  }

}
