import { Component, Input } from '@angular/core';
import { ElementTypeChoiceService } from 'src/app/services/pc-builder/element-type-choice.service';
import { ElementType } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-type-choice',
  templateUrl: './element-type-choice.component.html',
  styleUrls: ['./element-type-choice.component.scss']
})
export class ElementTypeChoiceComponent {
  @Input() name: string;
  @Input() elementType: ElementType;

  constructor(private buttonStateService: ElementTypeChoiceService) { }

  onButtonClick() {
    this.buttonStateService.setSelectedButton(this.elementType);
  }

  isSelected(): boolean {
    // Ajoutez la logique pour vérifier si le bouton est sélectionné ou non
    return this.buttonStateService.getSelectedButton() === this.elementType;
  }
}
