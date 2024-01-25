import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { NewPcConstraint, PcConstraint, PcConstraints } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class PcConstraintService {

  private baseUrl = environment.baseUrl + '/pc-constraints';

  constructor(private http: HttpClient) { }

  getPcConstraints(): Observable<PcConstraint[]> {
    return this.http
      .get<PcConstraints>(this.baseUrl)
      .pipe(map((pcConstraints) => pcConstraints.pcConstraints));
  }

  createPcConstraint(newPcConstraint: NewPcConstraint): Observable<PcConstraint> {
    return this.http
      .post<PcConstraint>(`${this.baseUrl}/create`, newPcConstraint);
  }

}
