import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { createPcConstraint } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.actions';
import { PcConstraintsState } from 'src/app/store/pc-builder/pc-constraints/pc-constraints.state';
import { NewPcConstraint } from 'src/typing-pc-builder';

@Component({
  selector: 'app-update-pc-constraint',
  templateUrl: './update-pc-constraint.component.html',
  styleUrls: ['./update-pc-constraint.component.scss']
})
export class UpdatePcConstraintComponent {

  update = 'Add';

  pcConstraintForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly pcConstraintStore: Store<PcConstraintsState>) {
    this.pcConstraintForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required, this.specialCaseForCodeValidator()],
      type: ['', Validators.required]
    });
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
    const newPcConstraint: NewPcConstraint = {
      name: this.name?.value,
      code: this.code?.value,
      type: this.type?.value
    }
    this.pcConstraintStore.dispatch(createPcConstraint({ newPcConstraint }))
  }

  onReset() {
    this.pcConstraintForm.reset();
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
