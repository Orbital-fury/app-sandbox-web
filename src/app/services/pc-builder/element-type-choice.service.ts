import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElementType, ElementTypeInfo } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedElementTypeSubject: BehaviorSubject<ElementTypeInfo> = new BehaviorSubject<ElementTypeInfo>({name:'CPU',code:'CPU',isPcElementSelected:false});
  selectedElementType$: Observable<ElementTypeInfo> = this.selectedElementTypeSubject.asObservable();

  setSelectedElementType(elementTypeInfo: ElementTypeInfo) {
    this.selectedElementTypeSubject.next(elementTypeInfo);
  }

  getSelectedElementType(): ElementTypeInfo {
    return this.selectedElementTypeSubject.getValue();
  }
}
