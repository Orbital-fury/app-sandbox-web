import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

// Source: https://www.vincent-barrault.fr/articles/faire-un-breadcrumb-avec-angular

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
    public breadcrumbs$: Observable<BreadcrumbItem[]>;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.breadcrumbs$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            distinctUntilChanged(),
            map(_ => this.buildBreadCrumb(this.route.root))
        );
    }

    private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
        const newBreadcrumbs = [...breadcrumbs];
        const path = route.snapshot.url.map(segment => segment.path).join('/');
        const nextUrl = `${url}/${path}`.replace('//', '/');

        if (route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
            let data = '';

            if (route.routeConfig.data['breadcrumb'][0] === '@') {
                route.routeConfig.data['breadcrumb'].split('.').forEach((level: string, index: number) => {
                    if (index === 0) {
                        data = route.snapshot.data[level.slice(1)];
                    } else {
                        data = !!data ? (data as any)[level] : null;
                    }
                });
            } else {
                data = route.routeConfig.data['breadcrumb'];
            }

            newBreadcrumbs.push({
                label: data,
                path: nextUrl
            });
        }

        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }

        return newBreadcrumbs;
    }
}
