import { Component, Input } from '@angular/core';
import { ElementChoiceService } from 'src/app/services/pc-builder/element-choice.service';
import { PcElement } from 'src/typing-pc-builder';

@Component({
  selector: 'app-element-choice',
  templateUrl: './element-choice.component.html',
  styleUrls: ['./element-choice.component.scss']
})
export class ElementChoiceComponent {
  @Input()
  pcElement: PcElement;

  constructor(private pcElementChoiceService: ElementChoiceService) {}

  onClick() {
    this.pcElementChoiceService.addSelectedPcElementToBuild(this.pcElement);
  }

}
