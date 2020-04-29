import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthorizationComponent } from './authorization/authorization.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthorizationComponent
  ]
})
export class AuthorizationModule { }
