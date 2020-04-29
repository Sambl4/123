import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState, AuthState } from '../../core/+store';
import * as AuthActions from '../../core/+store/auth/auth.actions';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../authorization.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})

export class AuthorizationComponent implements OnInit {
  public authState$: Observable<AuthState>;

  public needRegister: boolean;
  public emailExists: boolean;
  public goBack: any;

  public confirmPass: boolean;
  public roles = ['User', 'Admin'];
  public isAuthenticated: boolean;
  public submitted: boolean;
  public user: User = {
      id: Date.now(),
      email: '',
      firstName: '',
      lastName: '',
      pass: '',
      role: this.roles[0],
      token: ''
    };
  public isRegistred: boolean;
  private form: FormGroup;
  private loginForm: FormGroup;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<AppState>) {
     this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
      passCheking: ['', [Validators.required, Validators.minLength(4)]],
      role: ''
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.needRegister = false;
    this.isRegistred = false;
    this.isAuthenticated = false;
    this.submitted = false;
    this.emailExists = false;
    // this.store.dispatch(new AuthActions.AuthRequest());

    // this.authState$ = this.store.pipe(select('auth'));

    this.authorizationService.IsAuthenticated();
  }

  login() {
    this.isAuthenticated = this.authorizationService.Login(this.user);
    if (this.isAuthenticated) {
      console.log('logged in successfully');
      this.router.navigate(['../courses']);
    }
    this.submitted = true;
  }

  registration() {
    this.emailExists = this.authorizationService.isEmailExist(this.user);
    this.submitted = true;

    if (!this.emailExists) {
      this.authorizationService.registerNewUser(this.user);
      this.isRegistred = true;
    }
  }
}
