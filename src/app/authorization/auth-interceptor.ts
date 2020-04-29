import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthorizationService } from './authorization.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
private token: string;
    constructor(private authorizationService: AuthorizationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.authorizationService.getTokenFromStorage();
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = this.token ? req.clone({
                headers: req.headers.set('Authorization', this.token)
            }) : req.clone();

        return next.handle(authReq);
    }
}
