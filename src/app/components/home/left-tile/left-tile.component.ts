import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'left-tile',
  templateUrl: './left-tile.component.html',
  styleUrls: ['./left-tile.component.scss'],
})
export class LeftTileComponent {
  @Input() linkUrl: string = 'Placeholder link';
  @Input() rightAlign: boolean = false;
  @Input() title: string = 'Placeholder title';
  @Input() imageUrl: string = 'Placeholder image';
  @Input() description: string = 'Placeholder description';

  constructor() {}
  
}
