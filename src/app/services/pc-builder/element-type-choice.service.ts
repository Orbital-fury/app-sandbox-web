import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElementType } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedElementTypeSubject: BehaviorSubject<ElementType> = new BehaviorSubject<ElementType>('CPU');
  selectedElementType$: Observable<ElementType> = this.selectedElementTypeSubject.asObservable();

  setSelectedElementType(elementType: ElementType) {
    this.selectedElementTypeSubject.next(elementType);
  }

  getSelectedElementType(): ElementType {
    return this.selectedElementTypeSubject.getValue();
  }
}
