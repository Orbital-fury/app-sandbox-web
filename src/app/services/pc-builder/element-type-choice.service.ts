import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PcElementTypeEnum, PcElementType } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedElementTypeSubject = new Subject<PcElementTypeEnum>();

  selectedElementType$ = this.selectedElementTypeSubject.asObservable();

  notifySelectedElementType(elementType: PcElementTypeEnum) {
    this.selectedElementTypeSubject.next(elementType);
  }
}
