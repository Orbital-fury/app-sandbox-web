import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PcElement } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementChoiceService {

  private selectedPcElementSubject: BehaviorSubject<PcElement | undefined> = new BehaviorSubject<PcElement | undefined>(undefined);
  selectedPcElement$: Observable<PcElement | undefined> = this.selectedPcElementSubject.asObservable();

  addSelectedPcElementToBuild(pcElement: PcElement) {
    this.selectedPcElementSubject.next(pcElement);
  }

}
