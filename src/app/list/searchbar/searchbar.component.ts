import { Component, OnInit, Output, NgModule, EventEmitter } from '@angular/core';
import { Observable, interval, of, timer, Subscription, BehaviorSubject, fromEvent, from } from 'rxjs';
import { map, filter, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ListItem } from '../../model/list-item.model';
import { ListService } from '../list.service';
import { SearchByTitlePipe } from '../../share/pipe/my-search.pipe';

// const SEARCH_BY_FIELD: string = 'title';
// const searchBox = document.getElementById('search-box');

// const typeahead = fromEvent(searchBox, 'input').pipe(
//   map((e: KeyboardEvent) => e['target.value']),
//   filter(text => text.length > 2),
//   debounceTime(10),
//   distinctUntilChanged()
// );

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [ SearchByTitlePipe ]
})



export class SearchbarComponent implements OnInit {
  @Output() filteredArray: EventEmitter<ListItem[]> = new EventEmitter<ListItem[]>();
  @Output() searchedValue: EventEmitter<Observable<string>> = new EventEmitter<Observable<string>>();
  public searchValue: string;
  public isSearched: boolean;
  // private searchedArray: ListItem[] = [];

  constructor(private searchByTitlePipe: SearchByTitlePipe, private listService: ListService) {

    // typeahead.subscribe(data => {
    //   console.log(data);
    // });

  }

  ngOnInit() {
    this.isSearched = false;
  }

  changeSearchValue(value) {
    // console.log(value);

    // const source = from(value).pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged()
    //   );
    // const subcribe = source.subscribe(val => console.log(val));


    this.searchValue = value;
    this.isSearched = true;
    if (this.searchValue && this.searchValue.length > 3) {
      this.searchedValue.emit(this.searchobserver(this.searchValue));
      // const source = this.searchobserver(value);
      // const subcribe = source.subscribe(val => console.log(val));
    }

    // const source = of(value).pipe(
    //   debounce(() => timer(3000)),
    //   // distinctUntilChanged()
    // );
    // const subcribe = source.subscribe(val => console.log(val));
    // const subcribe = source.subscribe(val => console.log(val));
  }

  searchobserver(v): Observable<string>  {
    // return of(v).pipe(
    //   debounce(() => timer(3000)),
    //   // distinctUntilChanged()
    // );
    return Observable.create((observer) => {
      observer.next(v);
    }).pipe(
      debounceTime(3000),
      // distinctUntilChanged()
    );
  }

  searchingReset() {
    this.isSearched = false;
    this.searchValue = '';
    this.searchedValue.emit(this.searchobserver(this.searchValue));
  }


  search() {
    // let filteredByTitle: ListItem[];
    // this.searchedArray = this.listService.getOriginalListItems();

    // (this.searchValue && this.searchValue.length) ?
    //   filteredByTitle = this.searchByTitlePipe.transform(this.searchedArray, SEARCH_BY_FIELD, this.searchValue) :
    //   filteredByTitle = this.listService.getOriginalListItems();

    // this.filteredArray.emit(filteredByTitle);

    // if (this.searchValue && this.searchValue.length) {
      // this.searchedValue.emit(this.searchValue);
    // }
  }
}
