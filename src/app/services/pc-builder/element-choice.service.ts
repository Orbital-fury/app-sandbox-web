import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PcElement } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class ElementChoiceService {

  private selectedPcElementSubject: BehaviorSubject<PcElement | undefined> = new BehaviorSubject<PcElement | undefined>(undefined);
  selectedPcElement$: Observable<PcElement | undefined> = this.selectedPcElementSubject.asObservable();

  private choosenPcElementsSubject = new BehaviorSubject<PcElement[]>([]);
  choosenPcElements$ = this.choosenPcElementsSubject.asObservable();

  addSelectedPcElementToBuild(pcElement: PcElement) {
    // // Obtenez la valeur actuelle de choosenPcElements$
    // const currentChoosenPcElements = this.choosenPcElementsSubject.getValue();
    // // Mettez à jour choosenPcElements$ avec la nouvelle valeur
    // this.choosenPcElementsSubject.next([...currentChoosenPcElements, pcElement]);

    this.selectedPcElementSubject.next(pcElement);
  }

  setChoosenPcElements(pcElements: PcElement[]): void {
    this.choosenPcElementsSubject.next(pcElements);
  }

  removeSelectedPcElementToBuild(pcElement: PcElement): void {
    const currentChoosenPcElements = this.choosenPcElementsSubject.getValue();
    const updatedChoosenPcElements = currentChoosenPcElements.filter(element => element !== pcElement);
    
    this.choosenPcElementsSubject.next(updatedChoosenPcElements);
  }

}
