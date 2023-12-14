import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Machine, Machines } from '../../../typing';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private api_url: string = 'assets/machine-data.json';

  constructor(private http: HttpClient) {}

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machines>(this.api_url).pipe(
      map(machines => machines.machines)
    );
  }
}
