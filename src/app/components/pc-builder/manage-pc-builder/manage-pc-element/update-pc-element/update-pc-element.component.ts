import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadPcElementTypes } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.actions';
import { selectLoadingPcElementTypes, selectPcElementTypes } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.selectors';
import { PcElementTypesState } from 'src/app/store/pc-builder/pc-element-types/pc-element-types.state';
import { createPcElement, loadSinglePcElement, updatePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.actions';
import { selectLoadingSinglePcElement, selectSinglePcElement } from 'src/app/store/pc-builder/pc-elements/pc-elements.selectors';
import { PcElementsState } from 'src/app/store/pc-builder/pc-elements/pc-elements.state';
import { PcElement, PcElementType } from 'src/typing-pc-builder';
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
    pcElementTypes: PcElementType[] = [];
    loadingPcElementType: boolean;

    private pcElementId: number | undefined = undefined;
    private subs = new SubSink();

    constructor(
        private readonly route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private readonly pcElementStore: Store<PcElementsState>,
        private readonly pcElementTypeStore: Store<PcElementTypesState>,
        private decimalPipe: DecimalPipe
    ) {
        this.pcElementId = parseInt(this.route.snapshot.paramMap.get('elementId')!);
        this.pcElementForm = this.formBuilder.group({
            brand: ['', [Validators.required, Validators.minLength(3)]],
            model: ['', [Validators.required, Validators.minLength(3)]],
            price: ['', [Validators.required, this.priceValidator()]],
            img: [''],
            type: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.subs.sink = this.pcElementTypeStore.select(selectLoadingPcElementTypes)
            .subscribe(loading => this.loadingPcElementType = loading)
        this.subs.sink = this.pcElementTypeStore.select(selectPcElementTypes)
            .subscribe(pcElementTypes => this.pcElementTypes = pcElementTypes)

        this.pcElementTypeStore.dispatch(loadPcElementTypes())

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
        const img = this.img?.value
        const type: PcElementType = this.pcElementTypes.find(type => type.code === this.type?.value)!
        const pcElement: PcElement = {
            id: this.pcElementId ? this.pcElementId : -1,
            brand: this.brand?.value,
            model: this.model?.value,
            price: parseFloat(this.decimalPipe.transform(this.price?.value, '1.2-2')!.replaceAll(',', '')),
            img: img === '' ? null : img,
            type: type,
            constraints: [],
            specifications: []
        }
        console.log("type", type)
        console.log("pcElement", pcElement)
        if (this.pcElementId) {
            pcElement.constraints = this.pcElement.constraints
            pcElement.specifications = this.pcElement.specifications
            this.pcElementStore.dispatch(updatePcElement({ pcElement }))
        } else {
            this.pcElementStore.dispatch(createPcElement({ newPcElement: pcElement }))
        }
    }

    onReset() {
        if (this.pcElementId) {
            this.resetInputOnUpdate()
            this.pcElementForm.markAsPristine();
            this.pcElementForm.markAsUntouched();
        } else {
            this.pcElementForm.reset()
        }
    }

    private priceValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return (typeof +value === "number" && !isNaN(+value) && parseFloat(value).toFixed(2) !== '0.00') ? null : { price: true };
        };
    }

    private resetInputOnUpdate() {
        this.pcElementForm.patchValue({
            brand: this.pcElement.brand,
            model: this.pcElement.model,
            price: this.pcElement.price,
            img: this.pcElement.img,
            type: this.pcElement.type.code
        })
    }

}
