import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() public currentPage: number;
  @Input() public totalPages: number;
  @Output() changedCurrentPage: EventEmitter<number> = new EventEmitter<number>();
  public isFirstSet: boolean;
  public isLastSet: boolean;
  public showFirstItem: boolean;
  public showLastItem: boolean;

  constructor() { }

  ngOnInit() {
    this.updateFirstLastPages();
  }

  changeCurrentPage(e: Event) {
    const target = _.get(e.target, 'textContent');

    if (+target === this.currentPage ||
      (target === 'First' && this.isFirstSet) ||
      (target === 'Last' && this.isLastSet)) {
      return;
    }

    if (target === 'First') {
      this.currentPage = 1;
      this.updateFirstLastPages();
    } else if (target === 'Last') {
      this.currentPage = this.totalPages;
      this.updateFirstLastPages();
    } else {
      this.currentPage = +target;
      this.updateFirstLastPages();
    }
    this.changedCurrentPage.emit(this.currentPage);
  }

  updateFirstLastPages() {
    this.isFirstSet = this.currentPage >= 1 && this.currentPage <= 2 ? true : false;
    this.isLastSet = this.currentPage >= this.totalPages - 1 && this.currentPage <= this.totalPages ? true : false;
    this.showFirstItem = this.currentPage < 2 ? false : true;
    this.showLastItem = this.currentPage < this.totalPages - 1;
  }

}
