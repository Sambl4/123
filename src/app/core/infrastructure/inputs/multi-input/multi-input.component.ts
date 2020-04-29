import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import * as _ from 'lodash';
import { Author } from '../../../../model/author.model';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forEach } from '../../../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-multi-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiInputComponent),
      multi: true,
    }
  ],
  templateUrl: './multi-input.component.html',
  styleUrls: ['./multi-input.component.css']
})
export class MultiInputComponent implements OnInit {
  @Input() public options: Author[] = [];
  @Output() changedOptions: EventEmitter<Author[]> = new EventEmitter<Author[]>();

  public selectedOption: Author;
  public open: boolean = false;
  public authors: Author[];  // should receive list of all available authors from BE

  constructor() { }

  ngOnInit() {
    this.authors = [...this.options, {id: 1234, firstName: 'Initial', lastName: 'Test Author'}];
  }

  authorsSelect(author: Author) {
    this.writeValue(author);
    this.open = false;
  }

  writeValue(val: Author) {
    if (!val) {
      return ;
    }
      this.selectedOption = val;

      if (_.findIndex(this.options, {id: val.id}) === -1) {
        this.options.push(this.selectedOption);
      }
      this.changedOptions.emit(this.options);
  }

  removeOption(option) {
    this.options.splice(_.findIndex(this.options, {id: option.id}), 1);
  }

  toggleOpen() {
    console.log(this.open);
    this.open = !this.open;
  }

  get isOpen(): boolean {
    return this.open;
  }

  onChange: any = () => {
  }

  onTouched: any = () => {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
