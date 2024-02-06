import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, of } from 'rxjs';
import { loadSinglePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingSinglePcElement, selectSinglePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement } from 'src/typing-pc-builder';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-update-pc-element',
  templateUrl: './update-pc-element.component.html',
  styleUrls: ['./update-pc-element.component.scss']
})
export class UpdatePcElementComponent {

  update = 'Add';
  pcElementForm: FormGroup;
  pcElement: PcElement;
  loadingSinglePcElement: boolean;

  private pcElementId: number | undefined = undefined;
  private subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly pcElementStore: Store<PcElementsState>
  ) {
    this.pcElementId = parseInt(this.route.snapshot.paramMap.get('constraintId')!);
    this.pcElementForm = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
      price: ['', Validators.required],
      img: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.pcElementId) {
      this.update = 'Update';
      this.subs.sink = this.pcElementStore.select(selectSinglePcElement)
        .pipe(filter(data => data !== undefined))
        .subscribe(data => {
          this.pcElement = data!;
          this.resetInputOnUpdate()
        });
      this.subs.sink = this.pcElementStore.select(selectLoadingSinglePcElement)
        .subscribe(loading => this.loadingSinglePcElement = loading);

      this.pcElementStore.dispatch(loadSinglePcElement({ pcElementId: this.pcElementId }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get brand() {
    return this.pcElementForm.get('brand');
  }
  get model() {
    return this.pcElementForm.get('model');
  }
  get price() {
    return this.pcElementForm.get('price');
  }
  get img() {
    return this.pcElementForm.get('img');
  }
  get type() {
    return this.pcElementForm.get('type');
  }

  onSubmit() {
    // if (this.pcElementId) {
    //   const pcConstraint: PcConstraintWithoutValue = {
    //     id: this.pcElementId,
    //     name: this.name?.value,
    //     code: this.code?.value,
    //     type: this.type?.value
    //   }
    //   this.pcConstraintStore.dispatch(updatePcConstraint({ pcConstraint }))
    // } else {
    //   const newPcConstraint: NewPcConstraint = {
    //     name: this.name?.value,
    //     code: this.code?.value,
    //     type: this.type?.value
    //   }
    //   this.pcConstraintStore.dispatch(createPcConstraint({ newPcConstraint }))
    // }
  }

  onReset() {
    // if (this.pcElementId) {
    //   this.name?.patchValue(this.pcConstraint.name);
    //   this.code?.patchValue(this.pcConstraint.code);
    //   this.type?.patchValue(this.pcConstraint.type);
    //   this.pcElementForm.markAsPristine();
    //   this.pcElementForm.markAsUntouched();
    // } else {
    //   this.pcElementForm.reset()
    // }
  }

  private resetInputOnUpdate() {
    this.pcElementForm.patchValue({
      brand: this.pcElement.brand,
      model: this.pcElement.model,
      price: this.pcElement.price,
      img: this.pcElement.img,
      type: this.pcElement.type
    })
  }

}
