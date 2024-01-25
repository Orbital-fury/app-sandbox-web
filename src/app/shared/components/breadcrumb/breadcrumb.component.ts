import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbItem, BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'nav[app-breadcrumb]',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {

  breadcrumbs$: Observable<BreadcrumbItem[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

}
