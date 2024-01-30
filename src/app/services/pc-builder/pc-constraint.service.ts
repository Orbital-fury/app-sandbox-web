import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { NewPcConstraint, PcConstraintWithoutValue, PcConstraintsWithoutValue } from 'src/typing-pc-builder';

@Injectable({
  providedIn: 'root'
})
export class PcConstraintService {

  private baseUrl = environment.baseUrl + '/pc-constraints';

  constructor(private http: HttpClient) { }

  getPcConstraints(): Observable<PcConstraintWithoutValue[]> {
    return this.http
      .get<PcConstraintsWithoutValue>(this.baseUrl)
      .pipe(map((pcConstraints) => pcConstraints.pcConstraints));
  }

  getPcConstraint(id: number): Observable<PcConstraintWithoutValue> {
    return this.http
      .get<PcConstraintWithoutValue>(`${this.baseUrl}/${id}`);
  }

  createPcConstraint(newPcConstraint: NewPcConstraint): Observable<PcConstraintWithoutValue> {
    return this.http
      .post<PcConstraintWithoutValue>(this.baseUrl, newPcConstraint);
  }

  updatePcConstraint(pcConstraint: PcConstraintWithoutValue): Observable<PcConstraintWithoutValue> {
    return this.http
      .put<PcConstraintWithoutValue>(`${this.baseUrl}/${pcConstraint.id}`, pcConstraint);
  }

  deletePcConstraint(pcConstraintId: number): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/${pcConstraintId}`);
  }

}
