import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CustomToastrService } from 'src/app/shared/components/toast/custom-toastr.service';
import { loadPcConstraints } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.actions';
import { selectLoadingPcConstraints, selectPcConstraints } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.selectors';
import { PcConstraintsState } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.state';
import { PcConstraintWithoutValue } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';
import { ModalDeletePcConstraintComponent } from './modal-delete-pc-constraint/modal-delete-pc-constraint.component';

@Component({
  selector: 'app-manage-pc-constraint',
  templateUrl: './manage-pc-constraint.component.html',
  styleUrls: ['./manage-pc-constraint.component.scss']
})
export class ManagePcConstraintComponent implements OnInit, OnDestroy {

  loadingPcConstraints: boolean;
  pcConstraints: PcConstraintWithoutValue[] = [];
  private subs = new SubSink();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private readonly pcElementStore: Store<PcConstraintsState>,
    private customToastrService: CustomToastrService
  ) { }

  ngOnInit() {
    this.subs.sink = this.pcElementStore.select(selectPcConstraints).subscribe(pcConstraints => this.pcConstraints = pcConstraints);
    this.subs.sink = this.pcElementStore.select(selectLoadingPcConstraints).subscribe(loading => this.loadingPcConstraints = loading);

    this.pcElementStore.dispatch(loadPcConstraints());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  goToAddPcConstraint() {
    this.router.navigate([`${this.router.url}/create`]);
  }

  deletePcConstraint(pcConstraint: PcConstraintWithoutValue) {
    const modalRef = this.modalService.open(ModalDeletePcConstraintComponent, { centered: true, scrollable: true });
    modalRef.componentInstance.pcConstraint = pcConstraint;
  }

  showToast() {
    this.customToastrService.showInfo("HTTP 200", "Ouais ouais le toast info !!!")
    this.customToastrService.showSuccess("HTTP 200", "Ouais ouais le toast info !!!")
    this.customToastrService.showWarning("HTTP 200", "Ouais ouais le toast info !!!")
    this.customToastrService.showError("HTTP 200", "Ouais ouais le toast info !!!")
  }

}
