import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {
@Input() public inputData: string;
@Output() changedData: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  valueUpdate(newDate) {
    this.inputData = newDate;
    this.changedData.emit(this.inputData);
  }

}
