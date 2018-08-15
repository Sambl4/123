import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { ListItem } from '../../model/list-item.model';

import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public listItems: ListItem[] = [];
  public options: any;
  public routeParams: any = {};
  public pageSize: number;
  public currentPage:number;
  public totalPages: number;
  public pageSizeOptions = {
    minSize: 1,
    maxSize: 5
  };
  public textFragment: string

  private deletedID: number;
  private listItemIdFromUrl: string;

  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router) {
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
    this.listService.getList(this.currentPage, this.pageSize, this.textFragment).subscribe((data) => {
      this.listItems = data['items'];
      this.totalPages = data['totalPages'];
    });
  }

  getUsersFromBE() {
    this.listService.getUsers().subscribe((res: any[]) => {
      console.log(res);
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

  confirmResult(result: boolean) {
    result ? this.listService.removeListItemById(this.deletedID).subscribe((data) => {
      console.log(data);
      this.getListFromBE();
    }) : null;
  }

  updateItem(item: ListItem) {
    this.listService.updateItem(item);
  }

  addNewCourse() {
    // this.listService.createListItem();
    this.listService.createListItem().subscribe((data) => {
      data['editMode'] = true;
      // this.getListFromBE();
    })
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
    ++this.currentPage;
    this.listService.getList(this.currentPage, this.pageSize).subscribe((data) => {
      this.listItems = this.listItems.concat(data);
    })
  }

  changedCurrentPage(newCurrentPage: number) {
    this.currentPage = newCurrentPage;
    this.getListFromBE();
  }

  searchedValue(value) {
    this.textFragment = value;
    this.getListFromBE();
  }
}
