import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class RequestService {

  apiUrlPrefix = environment.backendUrl;

  constructor(private _http: HttpClient) { }


  post(url: string, body: any): Observable<any> {
    const fullUrl: string = this.apiUrlPrefix + url;
    return this._http.post(fullUrl, body);
  }

  patch(url: string, body: any): Observable<any> {
    const fullUrl: string = this.apiUrlPrefix + url;
    return this._http.patch(fullUrl, body);
  }

  get(url: string, params?: HttpParams): Observable<any> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const opts = params ? { params: params } : {};
    return this._http.get(fullUrl, opts);
  }

  put(url: string, body: any): Observable<any> {
    const fullUrl: string = this.apiUrlPrefix + url;
    return this._http.put(fullUrl, body);
  }

  delete(url: string): Observable<any> {
    const fullUrl: string = this.apiUrlPrefix + url;
    return this._http.delete(fullUrl);
  }

  postFileService(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': "" });
    return this._http.post(url, data, { headers: headers });
  }

}
