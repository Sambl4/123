import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit, OnChanges {
@Input() public options: any;
@Output() confirmResult: EventEmitter<boolean> = new EventEmitter<boolean>();

public modalTitle: string;
public showModalWindow: boolean;

  constructor() { }

  ngOnInit() {
    this.showModalWindow = false;
  }

  ngOnChanges() {
    this.showModalWindow = this.options && this.options.message ? true : false
  }

  reject() {
    this.confirmResult.emit(false);
    this.showModalWindow = false;
  }

  resolve() {
    this.confirmResult.emit(true);
    this.showModalWindow = false;
  }
}
