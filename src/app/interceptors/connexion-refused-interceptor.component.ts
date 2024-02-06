import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponseService } from '../services/api-response.service';

@Injectable()
export class ConnexionRefusedInterceptor implements HttpInterceptor {

    constructor(private readonly apiResponseService: ApiResponseService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 0) {
                    this.apiResponseService.launchConnectionRefusedApiError()
                }
                return throwError(() => 'No connection with the server. It may be offline/disconnected');
            })
        );
    }

}

/** Provider for the ConnexionRefused Interceptor. */
export const connexionRefusedInterceptorProvider: Provider =
    { provide: HTTP_INTERCEPTORS, useClass: ConnexionRefusedInterceptor, multi: true };
