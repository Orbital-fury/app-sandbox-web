import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementChoiceService } from 'src/app/services/pc-builder/element-choice.service';
import { PcElementService } from 'src/app/services/pc-builder/pc-element.service';
import { ElementTypeInfo, PcConstraint, PcElement } from 'src/typing-pc-builder';
import { PcBuilderStore } from '../../store/component-store/pc-builder.store';

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss'],
  providers: [PcBuilderStore]
})
export class PCBuilderComponent implements OnInit, OnDestroy {

  elementTypeChoices: ElementTypeInfo[] = [
    { name: "CPU", code: "CPU", isPcElementSelected: false },
    { name: "Case", code: "CASE", isPcElementSelected: false },
    { name: "GPU", code: "GPU", isPcElementSelected: false },
    { name: "Motherboard", code: "MOBO", isPcElementSelected: false },
    { name: "RAM", code: "RAM", isPcElementSelected: false },
    { name: "Power supply", code: "POWER", isPcElementSelected: false },
    { name: "Storage", code: "STORAGE", isPcElementSelected: false },
    { name: "Cooling system", code: "COOLING", isPcElementSelected: false }
  ];

  private subscriptionElementType: Subscription;
  selectedElementTypeInfo: ElementTypeInfo;
  private subscriptionPcElement: Subscription;
  pcElements: PcElement[] = [];
  pcElementsOfChoosenType: PcElement[] = [];
  pcBuildElements: PcElement[] = [];
  totalPrice: number = 0;
  pcConstraints: PcConstraint[] = [];

  // choosenPcElements$ = this.pcBuilderStore.choosenPcElement$;
  // pcElements$ = this.pcBuilderStore.pcElements$;
  // selectedPcElementTypeInfo$ = this.pcBuilderStore.selectedPcElementTypeInfo$;

  constructor(
    private pcElementService: PcElementService,
    // private elementTypeChoiceService: ElementTypeChoiceService,
    private pcElementChoiceService: ElementChoiceService,
    private readonly pcBuilderStore: PcBuilderStore
  ) {

  }

  ngOnInit(): void {
    this.pcBuilderStore.selectSelectedElementTypeInfo$.subscribe(selectedElementTypeInfo => {
      this.selectedElementTypeInfo = selectedElementTypeInfo


      this.pcBuilderStore.selectPcBuildElements$.subscribe(pcBuildElements => {
        this.pcBuildElements = pcBuildElements;
        this.totalPrice = pcBuildElements.map(pcBuildElement => pcBuildElement.price).reduce((sum, current) => sum + current, 0);
        this.pcElementService.getPcElementsWithConstraints(this.pcBuildElements).subscribe((data) => {
          this.pcElements = data;
          this.pcElementsOfChoosenType = this.pcElements.filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code) //this.getPcElementsOfChoosenType();
          console.log("subscribe de getPcElementsWithConstraints")
          console.log("new pcBuildElements", this.pcBuildElements)
          console.log("all pcElements according to constraints", this.pcElements)
        });
      });


    });
    
    // this.pcBuilderStore.selectPcElements$.subscribe(pcElements => { 
    //   this.pcElements = pcElements;
    //   console.log("pcBuildElements", this.pcBuildElements);
    // });
    this.pcBuilderStore.selectLastSelectedPcElement$.subscribe(lastSelectedPcElement => {
      if (lastSelectedPcElement) {
        // this.totalPrice += lastSelectedPcElement.price;
        var elementTypeChoice = this.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === lastSelectedPcElement.type);
        if (elementTypeChoice) {
          elementTypeChoice.isPcElementSelected = true;
        }
        this.pcBuilderStore.addPcElementToBuild(lastSelectedPcElement);
      }
    });

    this.pcBuilderStore.patchState({ selectedElementTypeInfo: this.elementTypeChoices[0] });




    // this.pcElementService.getPcElementsWithConstraints(this.pcBuildElements).subscribe((data) => {
    //   this.pcElements = data;
    //   this.pcElementsOfChoosenType = this.getPcElementsOfChoosenType();
    //   console.log("subscribe de getPcElements")
    // });
    // this.pcElementChoiceService.choosenPcElements$.subscribe(pcElements => {
    //   this.pcElementService.getPcElementsWithConstraints(pcElements).subscribe((data) => {
    //     this.pcElements = data;
    //     this.pcBuildElements = pcElements;
    //     this.pcElementsOfChoosenType = this.getPcElementsOfChoosenType();
    //     console.log("subscribe de getPcElements");
    //   });
    // });

    // this.elementTypeChoiceService.setSelectedElementType(this.elementTypeChoices[0])

    // this.subscriptionPcElement = this.pcElementChoiceService.selectedPcElement$.subscribe(pcElement => {
    //   if (pcElement) {
    //     this.pcBuildElements.push(pcElement);
    //     this.totalPrice += pcElement.price;
    //     var elementTypeChoice = this.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === pcElement.type);
    //     if (elementTypeChoice) {
    //       elementTypeChoice.isPcElementSelected = true;
    //     }
    //   }
    //   this.pcElementChoiceService.setChoosenPcElements(this.pcBuildElements);
    // });

    // this.subscriptionElementType = this.elementTypeChoiceService.selectedElementType$.subscribe(elementType => {
    //   this.selectedElementTypeInfo = elementType;
    //   this.pcElementsOfChoosenType = this.getPcElementsOfChoosenType();
    // });


  }

  ngOnDestroy() {
    this.subscriptionElementType.unsubscribe();
    this.subscriptionPcElement.unsubscribe();
  }

  removeElementFromChoosen(removedPcElement: PcElement) {
    this.totalPrice -= removedPcElement.price;
    // const filteredItems = this.choosenPcElements.filter(pcElement => pcElement !== removedPcElement);
    // this.choosenPcElements = filteredItems;
    this.pcElementChoiceService.removeSelectedPcElementToBuild(removedPcElement);

    // assumption that there is only on PC element for an element type
    var elementTypeInfo = this.elementTypeChoices.find(elementTypeChoice => elementTypeChoice.code === removedPcElement.type);
    if (elementTypeInfo) {
      elementTypeInfo.isPcElementSelected = false;
    }
  }

  private getPcElementsOfChoosenType(): PcElement[] {
    return this.pcElements.filter(pcElement => pcElement.type === this.selectedElementTypeInfo.code);
  }

}
