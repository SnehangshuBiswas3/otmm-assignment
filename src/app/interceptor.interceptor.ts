import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const copiedRequest = request.clone({
      setHeaders: {
        'X-Requested-By': localStorage.getItem('sessionId')!,
        OTDSToken: localStorage.getItem('OTDSTicket')!,
      },
    });

    return next.handle(copiedRequest);
  }
}
