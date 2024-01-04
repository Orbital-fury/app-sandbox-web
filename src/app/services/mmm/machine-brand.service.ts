import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment.dev';
import { Brand, Brands } from '../../../typing-mmm';

@Injectable({
  providedIn: 'root',
})
export class MachineBrandService {
  private baseUrl = environment.baseUrl + '/brands';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http
      .get<Brands>(this.baseUrl)
      .pipe(map((brands) => brands.brands));
  }

  getBrand(id: number): Observable<Brand> {
    return this.http
      .get<Brand>(`${this.baseUrl}/${id}`);
  }

}
