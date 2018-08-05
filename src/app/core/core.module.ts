import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';

import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NocontentComponent } from './nocontent/nocontent.component';
import { PagingComponent } from './paging/paging.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InfrastructureModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    ModalComponent,
    NocontentComponent,
    PagingComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    ModalComponent,
    InfrastructureModule
  ]
})
export class CoreModule { }
