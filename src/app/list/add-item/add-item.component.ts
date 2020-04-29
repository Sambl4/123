import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ListItem } from '../../model/list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddItemComponent implements OnInit {
@Input() public listItem: ListItem;
@Output() cancelEditItem: EventEmitter<ListItem> = new EventEmitter<ListItem>();
@Output() saveEditItem: EventEmitter<ListItem> = new EventEmitter<ListItem>();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelEdit(listItem: ListItem) {
    this.cancelEditItem.emit(listItem);
    this.router.navigate(['../courses']);
  }

  saveEdit(listItem: ListItem) {
    this.saveEditItem.emit(listItem);
    this.router.navigate(['../courses']);
  }

  changedDuration(duration: number) {
    this.listItem.duration = duration;
  }

  changedDate(date: string) {
    this.listItem.date = date;
  }
}
