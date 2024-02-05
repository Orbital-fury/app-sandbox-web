import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, timer } from 'rxjs';
import { filter, switchMap } from "rxjs/operators";
import { createPcConstraint, loadSinglePcConstraint, updatePcConstraint } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.actions';
import { selectLoadingSinglePcConstraint, selectSinglePcConstraint } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.selectors';
import { PcConstraintsState } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.state';
import { NewPcConstraint, PcConstraint, PcConstraintWithoutValue } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-update-pc-constraint',
  templateUrl: './update-pc-constraint.component.html',
  styleUrls: ['./update-pc-constraint.component.scss']
})
export class UpdatePcConstraintComponent implements OnInit, OnDestroy {

  update = 'Add';
  pcConstraintForm: FormGroup;
  pcConstraint: PcConstraintWithoutValue;
  loadingSinglePcConstraint: boolean;

  private constraintId: number | undefined = undefined;
  private subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly pcConstraintStore: Store<PcConstraintsState>
  ) {
    this.constraintId = parseInt(this.route.snapshot.paramMap.get('constraintId')!);
    this.pcConstraintForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required, this.specialCaseForCodeValidator()],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.constraintId) {
      this.update = 'Update';
      this.subs.sink = this.pcConstraintStore.select(selectSinglePcConstraint)
        .pipe(filter(data => data !== undefined))
        .subscribe(data => {
          this.pcConstraint = data!;
          this.name?.patchValue(data?.name);
          this.code?.patchValue(data?.code);
          this.type?.patchValue(data?.type);
        });
      this.subs.sink = this.pcConstraintStore.select(selectLoadingSinglePcConstraint)
        .subscribe(loading => this.loadingSinglePcConstraint = loading);

      this.pcConstraintStore.dispatch(loadSinglePcConstraint({ pcConstraintId: this.constraintId }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get name() {
    return this.pcConstraintForm.get('name');
  }
  get code() {
    return this.pcConstraintForm.get('code');
  }
  get type() {
    return this.pcConstraintForm.get('type');
  }

  handleNameInput() {
    const inputName: string = this.name?.value;
    this.code?.patchValue(
      inputName
        .toUpperCase()
        .normalize('NFD') // Decompose combined graphemes into the combination of simple ones. è = e + `
        .replace(/[\u0300-\u036f]/g, "") // Replace all accent
        .replace(/[-&~"'{}()[\] !?.,;:]/g, "_") // replace special character by underscore
        .replace(/[_]+/g, "_") // remove multiplied underscore by only one
        .replace(/^_|_$/g, "") // remove underscore if first and last character
    );
  }

  onSubmit() {
    if (this.constraintId) {
      const pcConstraint: PcConstraintWithoutValue = {
        id: this.constraintId,
        name: this.name?.value,
        code: this.code?.value,
        type: this.type?.value
      }
      this.pcConstraintStore.dispatch(updatePcConstraint({ pcConstraint }))
    } else {
      const newPcConstraint: NewPcConstraint = {
        name: this.name?.value,
        code: this.code?.value,
        type: this.type?.value
      }
      this.pcConstraintStore.dispatch(createPcConstraint({ newPcConstraint }))
    }
  }

  onReset() {
    console.log("reset constraint update")
    if (this.constraintId) {
      this.name?.patchValue(this.pcConstraint.name);
      this.code?.patchValue(this.pcConstraint.code);
      this.type?.patchValue(this.pcConstraint.type);
      this.pcConstraintForm.markAsPristine();
      this.pcConstraintForm.markAsUntouched();
    } else {
      this.pcConstraintForm.reset()
    }
  }

  private specialCaseForCodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      if (!value) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() => {
          const hasGoodCase = /^[A-Z0-9]+(_[A-Z0-9]+)*$/.test(value);
          return hasGoodCase ? of(null) : of({ caseForCode: true });
        })
      );
    };
  }

}
