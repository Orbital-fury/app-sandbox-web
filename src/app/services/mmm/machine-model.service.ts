import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { Model, Models } from 'src/typing-mmm';

@Injectable({
  providedIn: 'root',
})
export class MachineModelService {
  private baseUrl = environment.baseUrl + '/models';

  constructor(private http: HttpClient) { }

  getModels(): Observable<Model[]> {
    return this.http
      .get<Models>(this.baseUrl)
      .pipe(map((models) => models.models));
  }

  getModel(id: number): Observable<Model> {
    return this.http
      .get<Model>(`${this.baseUrl}/${id}`);
  }

}
