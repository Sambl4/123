import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthorizationService } from '../../../authorization/authorization.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    AuthRequest$ = this.actions$.pipe(
        ofType<AuthActions.AuthRequest>(AuthActions.AuthActionTypes.AUTH_REQUEST),
        switchMap(() => this.authorizationService.IsAuthenticated().pipe(
                // map((result: boolean) => new AuthActions.AuthSuccess(result)),

            )
        )
    );

    constructor(private authorizationService: AuthorizationService, private actions$: Actions) {}
}