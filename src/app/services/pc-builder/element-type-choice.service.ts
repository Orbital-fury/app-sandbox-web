import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeChoiceService {
  private selectedButtonSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedButton$: Observable<string> = this.selectedButtonSubject.asObservable();

  setSelectedButton(buttonName: string) {
    this.selectedButtonSubject.next(buttonName);
  }

  getSelectedButton(): string {
    return this.selectedButtonSubject.getValue();
  }
}
