import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-pc-constraint',
  templateUrl: './update-pc-constraint.component.html',
  styleUrls: ['./update-pc-constraint.component.scss']
})
export class UpdatePcConstraintComponent {

  update = 'Add';

  pcConstraintForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    type: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

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
    console.log("on submit ouais ouais")
  }

  onReset() {
    this.pcConstraintForm.reset();
  }

}
