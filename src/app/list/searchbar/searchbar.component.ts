import { Component, OnInit, NgModule } from '@angular/core';

import { ListItem } from '../../model/list-item.model';
import { ListService } from '../list.service';
import { SearchByTitlePipe } from '../../share/pipe/my-search.pipe';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [ SearchByTitlePipe ]
})
export class SearchbarComponent implements OnInit {
  searchValue: string;
  private searchedArray: ListItem[] = [];

  constructor(private searchByTitlePipe: SearchByTitlePipe, private listService: ListService) { }

  ngOnInit() {
    this.searchedArray = this.listService.getListItems();
  }

  search() {
    if (this.searchValue && this.searchValue.length) {
      console.log(this.searchValue);
      console.log(this.searchByTitlePipe.transform(this.searchedArray, this.searchValue));
      this.searchValue = '';
    }
  }
}
