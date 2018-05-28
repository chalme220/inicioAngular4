import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Liga } from './liga';
//import { Proxy } from '.../proxy.conf';
@Injectable()
export class DataService {

  private partidoUrl = '/liga';  // URL to web API
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url0 = 'http://localhost:8080';
  constructor(private http: Http) { }

  // Get all customers
  getPartidos(): Promise<Liga[]> {
    return this.http.get(this.url0 + this.partidoUrl)
      .toPromise()
      .then(response => response.json() as Liga[])
      .catch(this.handleError);
  }


  getPartidoByEquipoLocal(equipoLocal: string): Promise<Liga[]> {
    const url = `/local/${equipoLocal}`;
    console.log('url ' + this.url0 + this.partidoUrl + url);
    return this.http.get(this.url0 + this.partidoUrl + url)
      .toPromise()
      .then(response => response.json() as Liga[])
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.partidoUrl}/${id}`;
    console.log('url ' + this.url0 + this.partidoUrl + url);
    return this.http.delete(this.url0 + url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  create(partido: Liga): Promise<Liga> {
    console.log("creando " + this.url0 + this.partidoUrl);
    return this.http
      .post("http://localhost:8080/liga", partido, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Liga)
      .catch(this.handleError);
  }



  update(partido: Liga): Promise<Liga> {
    console.log("creando " + this.url0 + this.partidoUrl);
    return this.http
      .put("http://localhost:8080/liga", partido)
      .toPromise()
      .then(res => res.json() as Liga)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
