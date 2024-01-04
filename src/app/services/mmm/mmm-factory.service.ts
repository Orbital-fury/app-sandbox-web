import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { Factories, Factory } from 'src/typing-mmm';

@Injectable({
  providedIn: 'root',
})
export class MmmFactoryService {
  private baseUrl = environment.baseUrl + '/factories';

  constructor(private http: HttpClient) { }

  getFactories(): Observable<Factory[]> {
    return this.http
      .get<Factories>(this.baseUrl)
      .pipe(map((factories) => factories.factories));
  }

  getFactory(id: number): Observable<Factory> {
    return this.http
      .get<Factory>(`${this.baseUrl}/${id}`);
  }

}
