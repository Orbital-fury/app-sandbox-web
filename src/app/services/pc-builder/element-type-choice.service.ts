import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PcElementType, ElementTypeInfo } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedElementTypeSubject = new Subject<PcElementType>();

  selectedElementType$ = this.selectedElementTypeSubject.asObservable();

  notifySelectedElementType(elementType: PcElementType) {
    this.selectedElementTypeSubject.next(elementType);
  }
}
