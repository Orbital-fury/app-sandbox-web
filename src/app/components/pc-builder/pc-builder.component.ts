import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementTypeInfo, PcElement } from 'src/typing-pc-builder';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss'],
  providers: [PcBuilderStore]
})
export class PCBuilderComponent implements OnInit, OnDestroy {

  selectedElementTypeInfo: ElementTypeInfo;
  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  pcBuildElements: PcElement[] = [];
  totalPrice: number = 0;
  elementTypeChoices: ElementTypeInfo[] = [];

  constructor(
    private pcElementService: PcElementService,
    private readonly pcBuilderStore: PcBuilderStore
  ) { }

  ngOnInit(): void {
    this.pcElementService.getPcElements().subscribe(pcElements => {
      this.pcBuilderStore.patchState({ pcElements: pcElements });
    });

    combineLatest([
      this.pcBuilderStore.selectSelectedElementTypeInfo$,
      this.pcBuilderStore.selectPcElements$,
    ]).subscribe(([selectedElementTypeInfo, pcElements]) => {
      this.selectedElementTypeInfo = selectedElementTypeInfo;
      this.pcElements = pcElements;
      this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === selectedElementTypeInfo.code);
    });

    this.pcBuilderStore.selectElementTypeChoices$.subscribe(elementTypeChoices => this.elementTypeChoices = elementTypeChoices);

    this.pcBuilderStore.selectPcBuildElements$.subscribe(pcBuildElements => {
      this.pcElementService.getPcElementsWithConstraints(pcBuildElements).subscribe(pcElements => {
        this.pcBuilderStore.patchState({ pcElements: pcElements })
        this.pcElementsOfChoosenType = pcElements.filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code);
      });
      this.pcBuildElements = pcBuildElements;
      this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
    });
  }

  ngOnDestroy() { }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.totalPrice -= removedPcElement.price;
    this.pcBuilderStore.removePcElementFromBuild(removedPcElement);
  }

}
