import {Request, XHRBackend, XHRConnection} from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/toPromise';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://myurl.com';
    req = req.clone({
      url: url + req.url
    });
    return next.handle(req);
  }
}