import { Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'nav[app-breadcrumb]',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  constructor(
    public breadcrumbService: BreadcrumbService
  ) { }
}
