import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { BusyService } from '../_services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.busyService.showBusy();
    return next.handle(request).pipe(
      finalize(()=>{
        this.busyService.hideBusy();

      }),
      tap((event) => {
        if (event.type == HttpEventType.Sent) {
          // this.busyService.showBusy();

        } else if (event.type == HttpEventType.Response) {
          this.busyService.hideBusy();
        }
      })
    );
  }
}
