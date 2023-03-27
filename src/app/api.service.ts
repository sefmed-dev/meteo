import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private apiUrl = 'https://api.weatherapi.com/v1/current.json';
  private accessKey = 'c3f1d4757c3a422791b71834232703';

  constructor(private http: HttpClient) {}

  getWeatherData(query: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.accessKey}&q=${query}&aqi=no`;
    return this.http.get<any>(url);
  }
}
