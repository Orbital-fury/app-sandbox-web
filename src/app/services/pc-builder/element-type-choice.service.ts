import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElementType } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedButtonSubject: BehaviorSubject<ElementType> = new BehaviorSubject<ElementType>('CPU');
  selectedButton$: Observable<ElementType> = this.selectedButtonSubject.asObservable();

  setSelectedButton(buttonName: ElementType) {
    this.selectedButtonSubject.next(buttonName);
  }

  getSelectedButton(): ElementType {
    return this.selectedButtonSubject.getValue();
  }
}
