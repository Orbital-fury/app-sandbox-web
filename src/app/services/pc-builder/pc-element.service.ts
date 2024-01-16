import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { PcConstraint, PcElement, PcElements } from 'src/typing-pc-builder';

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

  getPcElementsWithConstraints(pcElementsFromBuild: PcElement[]): Observable<PcElement[]> {
    // Obtenez les ids des contraintes
    const elementFromBuildIds = pcElementsFromBuild.map(element => element.id);
    
    // Construisez les paramètres de requête
    const params = new HttpParams().set('ids', elementFromBuildIds.join(','));
    return this.http
      .get<PcElements>(`${this.baseUrl}/constraints/elements`, { params })
      .pipe(map((pcElements) => pcElements.pcElements));
  }

}
