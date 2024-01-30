import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deletePcConstraint, loadPcConstraints } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.actions';
import { selectLoadingPcConstraints, selectPcConstraints } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.selectors';
import { PcConstraintsState } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.state';
import { PcConstraintWithoutValue } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-manage-pc-constraint',
  templateUrl: './manage-pc-constraint.component.html',
  styleUrls: ['./manage-pc-constraint.component.scss']
})
export class ManagePcConstraintComponent implements OnInit, OnDestroy {

  loadingPcConstraints: boolean;
  pcConstraints: PcConstraintWithoutValue[] = [];
  private subs = new SubSink();

  constructor(private router: Router, private readonly pcElementStore: Store<PcConstraintsState>) { }

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

  deletePcConstraint(constraintId: number) {
    this.pcElementStore.dispatch(deletePcConstraint({ pcConstraintId: constraintId }));
  }

}
