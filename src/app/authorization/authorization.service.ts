import { Injectable } from '@angular/core';

import { ActivatedRoute, ActivatedRouteSnapshot, Router, Params } from '@angular/router';

import { HttpClient, HttpResponse, HttpErrorResponse,
  HttpParams, HttpHeaders  } from '@angular/common/http';
import * as _ from 'lodash';
import { User } from '../model/user.model';

import { Observable, BehaviorSubject, throwError } from 'rxjs';

const BASE_USERS_URL = 'http://localhost:3004/users';
const USER_LOGIN_EMAIL_URL = 'http://localhost:3004/user/login/email';
const USER_LOGIN_TOKEN_URL = 'http://localhost:3004/user/login/token';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this._isAuthenticated.asObservable();

  private redirectUrl: string;
  private authKey: string = '';
  private users: User[] = [];

  private activeUser: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
    // this.activatedRoute.data.subscribe((data) => {
    //   data['auth_key'] = this.authKey;
    // });

    this.activatedRoute.queryParams.subscribe((data) => {
      this.redirectUrl = _.get(data, 'redirectedFrom', '');
    });
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_USERS_URL}`);
  }

  loginUserByEmail(email: string, pass: string): Observable<any[]> {
    return this.http.get<any[]>(`${USER_LOGIN_EMAIL_URL}`, {
      params: {
        email: email,
        pass: pass
      }
    });
  }

  loginUserByToken(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${USER_LOGIN_TOKEN_URL}`, {
      params: { token: token }
    });
  }

  Login(user: User): boolean {
    let isAuthenticated;

    this.loginUserByEmail(user.email, user.pass).subscribe((data) => {
      if (data) {
        this.activeUser = data;
        this.setTokenToStorage(this.activeUser.token);
        this.router.navigate([this.redirectUrl]);
        this._isAuthenticated.next(true);
        isAuthenticated = true;
      } else {
        this._isAuthenticated.next(false);
        isAuthenticated = false;
      }
    });
    return isAuthenticated;
  }

  Logout() {
    this._isAuthenticated.next(false);
    this.removeTokenFromStorage();
  }

  IsAuthenticated() {
    const userTokenFromStorage: string = this.getTokenFromStorage();

    userTokenFromStorage ? this.loginUserByToken(userTokenFromStorage).subscribe((data) => {
      this.activeUser = data;
      this._isAuthenticated.next(true);
      this.router.navigate([this.redirectUrl]);
    }) : this._isAuthenticated.next(false);
    return this.isAuthenticated;
  }

  GetActiveUserInfo() {
    return this.activeUser;
  }

  generateToken(user: User) {
    return 'fake' + user.id.toString().split('').reverse().join('') +
          'token' + user.firstName.toLowerCase().split('').reverse().join('');
  }

  setTokenToStorage(token) {
    localStorage.setItem('mytoken', token);
  }

  setUserToDB(user: User) {
    localStorage.setItem('db', JSON.stringify(this.users));
  }

  removeTokenFromStorage() {
    localStorage.removeItem('mytoken');
  }

  getTokenFromStorage() {
    return localStorage.getItem('mytoken');
  }

  getTokenFromDB(token: string): boolean {
    this.activeUser = _.find(this.users, {token : token});

    return this.activeUser ? true : false;

  }

  isEmailExist(user: User): boolean {
    return _.findIndex(this.users, {email : user.email}) !== -1;
  }

  registerNewUser(user: User) {
    user.token = this.generateToken(user);
    this.users.push(user);
    this.setUserToDB(user);
  }

  private getUserIndex(user: User) {
    return _.findIndex(this.users, {email : user.email});
  }
}
