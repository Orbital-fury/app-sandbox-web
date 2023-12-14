import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, CustomerWithFactories, Customers, CustomersWithFactories, Factories } from '../../../typing';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private api_url: string = 'assets/customer-data.json';
  private factoriesUrl = 'assets/factory-data.json';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customers>(this.api_url)
      .pipe(map((customers) => customers.customers));
  }

  getCustomer(customerId: number): Observable<Customer | undefined> {
    return this.http
      .get<Customers>(this.api_url)
      .pipe(
        map((customers) =>
          customers.customers.find((customer) => customer.id === customerId)
        )
      );
  }

  getCustomersWithFactories(): Observable<CustomerWithFactories[]> {
    const customersObservable = this.http.get<Customers>(this.api_url);
    const factoriesObservable = this.http.get<Factories>(this.factoriesUrl);

    return forkJoin([customersObservable, factoriesObservable]).pipe(
      map(([customers, factories]) => {
        // Fusionner les données des clients et des usines
        const customersWithFactories: CustomerWithFactories[] = customers.customers.map(
          (customer) => {
            const customerFactories = factories.factories.filter(
              (factory) => factory.customerId === customer.id
            );
            return {
              ...customer,
              factories: customerFactories,
            };
          }
        );

        return customersWithFactories;
      })
    );
  }



  /*
  getEmployees(): Observable<any> {
    return this.http.get(this.employee_api_url + '/read')
      .pipe(map((resp: any) => resp.json()))
  }
  */
}
