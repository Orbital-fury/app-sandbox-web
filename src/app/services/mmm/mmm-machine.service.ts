import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import {
  Machine,
  Machines
} from '../../../typing-mmm';

@Injectable({
  providedIn: 'root',
})
export class MmmMachineService {
  private baseUrl = environment.baseUrl + '/machines';

  constructor(private http: HttpClient) { }

  getMachines(): Observable<Machine[]> {
    return this.http
      .get<Machines>(this.baseUrl)
      .pipe(map((machines) => machines.machines));
  }

  getMachine(id: number): Observable<Machine> {
    return this.http
      .get<Machine>(`${this.baseUrl}/${id}`);
  }

}
