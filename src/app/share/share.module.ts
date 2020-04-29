import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BorderHighlightDirective } from './directives/highlight.directive';
import { DurationFormatPipe } from './pipe/duration-format.pipe';
import { OrderBycreationDatePipe } from './pipe/my-orderby.pipe';
import { SearchByTitlePipe } from './pipe/my-search.pipe';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    BorderHighlightDirective,
    DurationFormatPipe,
    OrderBycreationDatePipe,
    SearchByTitlePipe
  ],
  exports: [
    BorderHighlightDirective,
    DurationFormatPipe,
    OrderBycreationDatePipe,
    SearchByTitlePipe
  ]
})
export class ShareModule { }
