import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { listReducer, ListEffects } from '../core/+store';

import { SearchbarComponent } from './searchbar/searchbar.component';

import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { AddItemComponent } from './add-item/add-item.component';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    CoreModule,
    RouterModule,
    StoreModule.forFeature('list', listReducer),
    EffectsModule.forFeature([ListEffects])
  ],
  declarations: [
    ListComponent,
    ListItemComponent,
    SearchbarComponent,
    AddItemComponent,
  ],
  exports: [
    ListComponent,
    SearchbarComponent,
    AddItemComponent
  ]
})
export class ListModule { }
