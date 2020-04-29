import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { empty } from '../../../../node_modules/rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { AppState, ListState } from '../../core/+store';
import * as ListActions from '../../core/+store/list/list.actions';

import { Observable } from 'rxjs';

import * as _ from 'lodash';
import { ListItem } from '../../model/list-item.model';

import { ListService } from '../list.service';
import { LoadingService } from '../../core/loading/loading.service';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public listItems: ListItem[] = [];
  public listState$: Observable<ListState>;

  public options: any;
  public routeParams: any = {};
  public pageSize: number;
  public currentPage: number;
  public totalPages: number;
  public pageSizeOptions = {
    minSize: 5,
    maxSize: 10
  };
  public textFragment: string;

  private deletedID: number;
  private listItemIdFromUrl: string;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private store: Store<AppState>
  ) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('courses')) {
          let pathArr = event.url.split('/');
          this.listItemIdFromUrl = pathArr[pathArr.indexOf('courses') + 1];
        }
      }
    });
  }

  ngOnInit() {
    this.pageSize = this.pageSizeOptions.minSize;
    this.currentPage = 1;

    this.getListFromBE();

    let itemById = this.listItems[this.listService.getListItemById(+this.listItemIdFromUrl)];
    if (this.listItemIdFromUrl === 'new') {
      this.listService.createListItem();
    } else if (this.listItemIdFromUrl && itemById) {
      itemById.editMode = !itemById.editMode;
    } else if (this.listItemIdFromUrl) {
      this.router.navigate(['../page404']);
    }
  }

  getListFromBE() {
    // this.showLoader();
    // this.listService.getList(this.currentPage, this.pageSize, this.textFragment)
    // .pipe(
    //   catchError(value => {
    //     console.warn(value);
    //     return empty();
    //   })
    // )
    // .subscribe((data) => {
    //   this.listItems = [].concat(data['items']);
    //   this.totalPages = data['totalPages'];
    //   this.hideLoader();
    // });

    this.showLoader();
    this.store.dispatch(new ListActions.GetList());
    this.listState$ = this.store.pipe(select('list'));
    this.listState$.subscribe(result => {
      if (result.data) {
        this.listItems = [].concat(result.data);
        this.totalPages = result.totalPages;

        if (result.loaded) {
          this.hideLoader();
        }
      }
    });
  }

  getUsersFromBE() {
    this.showLoader();
    this.listService.getUsers().subscribe((res: any[]) => {
      console.log(res);
      this.hideLoader();
    });
  }

  filteredArray(value: ListItem[]) {
    this.listItems = value;
  }

  deleteItemById(listItem: ListItem) {
    const deletedTitle = listItem.title ? listItem.title : 'New';
    this.deletedID = listItem.id;
    this.options = {
      title: 'Delete course.',
      message: 'Do you really want to delete ' + deletedTitle + ' course? '
    };
  }

  confirmResult(confirmResult: boolean) {
    confirmResult ? this.listService.removeListItemById(this.deletedID).subscribe((data) => {
      console.log(data);
      this.getListFromBE();
    }) : null;
  }

  editItemById(item: ListItem) {
    this.store.dispatch(new ListActions.EditListItem(item));

    this.listState$ = this.store.pipe(select('list'));
    this.listState$.subscribe(result => {
      if (result.data) {
        this.listItems = [].concat(result.data);
      }
    });
  }

  cancelEditItemById(item: ListItem) {
    this.store.dispatch(new ListActions.CancelEditListItem(item));

    this.listState$ = this.store.pipe(select('list'));
    this.listState$.subscribe(result => {
      if (result.data) {
        this.listItems = [].concat(result.data);
      }
    });
  }

  updateItem(item: ListItem) {
    this.listService.updateItem(item);
  }

  addNewCourse() {
    // this.listService.createListItem();
    this.listService.createListItem().subscribe((data) => {
      data['editMode'] = true;
      // this.getListFromBE();
    });
    this.router.navigate(['../courses', 'new'], {queryParams: {itemId: 'new', itemName: 'New'}});
  }

  setUrlParams(item: ListItem) {
    this.route.params.subscribe((data) => {
      this.routeParams.id = item.id;
    });
    // this.route.data.subscribe((data) => {
    //   console.log(data['auth_key']);
    // });
    this.router.navigate(['../courses', item.id], {queryParams: {itemId: item.id, itemName: item.title}});
  }

  pageSizeUpdate(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.getListFromBE();
  }

  loadMore() {
    // ++this.currentPage;
    this.pageSize = this.pageSize + 5;
    this.listService.getList(this.currentPage, this.pageSize).subscribe((data) => {
      this.listItems = this.listItems.concat(data);
    });
  }

  changedCurrentPage(newCurrentPage: number) {
    this.currentPage = newCurrentPage;
    this.getListFromBE();
  }

  searchedValue(value) {
    const subscribe = value.subscribe(data => {
      this.textFragment = data;
    });
    this.getListFromBE();
  }

  private showLoader() {
    this.loadingService.showLoader();
  }

  private hideLoader() {
    this.loadingService.hideLoader();
  }
}
