import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { NewPcConstraint, PcConstraintWithoutValue, PcConstraintsWithoutValue, PcElementConstraintValues, PcElementsConstraintValues } from 'src/typing-pc-builder';

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

  getPcElementAndConstraintValues(constraintId: number): Observable<PcElementConstraintValues[]> {
    return this.http
      .get<PcElementsConstraintValues>(`${this.baseUrl}/${constraintId}/pc-elements`)
      .pipe(map((pcElements) => pcElements.pcElements));
  }

  createPcConstraint(newPcConstraint: NewPcConstraint): Observable<PcConstraintWithoutValue> {
    return this.http
      .post<PcConstraintWithoutValue>(this.baseUrl, newPcConstraint);
  }

  updatePcConstraint(pcConstraint: PcConstraintWithoutValue): Observable<PcConstraintWithoutValue> {
    return this.http
      .put<PcConstraintWithoutValue>(`${this.baseUrl}/${pcConstraint.id}`, pcConstraint);
  }

  deletePcConstraint(pcConstraintId: number): Observable<PcConstraintWithoutValue> {
    return this.http
      .delete<PcConstraintWithoutValue>(`${this.baseUrl}/${pcConstraintId}`);
  }

}
