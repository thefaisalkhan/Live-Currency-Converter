import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  private baseUrl = 'http://localhost:8080/api'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getExchangeRate(amount: number, fromCurrency: string, toCurrency: string): Observable<number | null> {
    console.log(`Calling Conversion of Amount ${amount} from ${fromCurrency} to ${toCurrency}`);
    const url = `${this.baseUrl}/exchange-rate/${amount}/${fromCurrency}/${toCurrency}`;
    return this.http.get<number>(url).pipe(
      catchError((error: any) => {
        console.error('Error in getExchangeRate', error);
        return of(null);
      })
    );
  }
}
