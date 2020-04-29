import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../share/share.module';

import { DateInputComponent } from './inputs/date-input/date-input.component';
import { DurationInputComponent } from './inputs/duration-input/duration-input.component';
import { MultiInputComponent } from './inputs/multi-input/multi-input.component';

@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    DateInputComponent,
    DurationInputComponent,
    MultiInputComponent
  ],
  exports: [
    DateInputComponent,
    DurationInputComponent,
    MultiInputComponent
  ]
})
export class InfrastructureModule { }
