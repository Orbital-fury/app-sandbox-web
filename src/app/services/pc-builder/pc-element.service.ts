import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { PcElement, PcElements } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class PcElementService {
  private baseUrl = environment.baseUrl + '/pc-elements';

  constructor(private http: HttpClient) { }

  getPcElements(): Observable<PcElement[]> {
    return this.http
      .get<PcElements>(this.baseUrl)
      .pipe(map((pcElements) => pcElements.pcElements));
  }

}
