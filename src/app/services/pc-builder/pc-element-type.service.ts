import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { PcElementType, PcElementTypes } from 'src/typing-pc-builder';

@Injectable({
    providedIn: 'root'
})
export class PcElementTypeService {

    private baseUrl = environment.baseUrl + '/pc-element-types';

    constructor(private http: HttpClient) { }

    getPcElementTypes(): Observable<PcElementType[]> {
        return this.http
            .get<PcElementTypes>(this.baseUrl)
            .pipe(map((pcElementTypes) => pcElementTypes.pcElementTypes));
    }
}
