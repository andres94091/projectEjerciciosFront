import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  loadGraphData(): Observable<any> {
    const apiLink = 'https://api.myjson.com/bins/13lnf4';
    return this.http.get<any>(apiLink, this.httpOptions);
  }
}
