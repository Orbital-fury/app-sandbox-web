import { Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'nav[app-breadcrumb]',
    templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
    constructor(
        public breadcrumbService: BreadcrumbService
    ) {}
}
