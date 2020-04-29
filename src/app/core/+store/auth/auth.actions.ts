import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    AUTH_REQUEST = '[Auth] AUTH_REQUEST',
    AUTH_FAILURE = '[Auth] AUTH_FAILURE',
    AUTH_SUCCESS = '[Auth] AUTH_SUCCESS'
}

export class AuthRequest implements Action {
    readonly type = AuthActionTypes.AUTH_REQUEST;
    constructor() { }
}

export class AuthFailure implements Action {
    readonly type = AuthActionTypes.AUTH_FAILURE;
    constructor(public payload: {error: string}) {}
}

export class AuthSuccess implements Action {
    readonly type = AuthActionTypes.AUTH_SUCCESS;
    constructor(public payload: {state: boolean}) {}
}

export type AuthActions =
      AuthRequest
    | AuthFailure
    | AuthSuccess;