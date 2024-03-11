import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(
    private http: HttpClient,
  ) { }

  _currencyQuotes: ReplaySubject<any> = new ReplaySubject();
  currencyQuotes: Observable<any> = this._currencyQuotes.asObservable();

  loadQuotes(from: string = 'USD', to: string = 'BRL' ) {

      this.http.get<any>(`https://api.invertexto.com/v1/currency/${from}_${to}?token=6939|LWHpBFAzfq1tiZD283eV1fuq0Flj0Lef`).subscribe( res => this._currencyQuotes.next(res))
  }
}
