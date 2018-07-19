import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { ListItem } from '../model/list-item.model';

const originalListItems:  ListItem[] = [
  {
    id: 1,
    title: 'Title 1',
    duration: 67,
    date: '2018-05-15',
    description: 'Description 1',
    rate: true,
    editMode: false,
  }, {
    id: 2,
    title: 'Title 2',
    duration: 90,
    date: '2018-09-21',
    description: 'Description 2',
    rate: false,
    editMode: false,
  }, {
    id: 3,
    title: 'Title 3',
    duration: 15,
    date: '2018-09-07',
    description: 'Description 3',
    rate: true,
    editMode: false,
  }, {
    id: 4,
    title: 'Title 1',
    duration: 60,
    date: '2018-06-29',
    description: 'Angular is running in the development mode. Call enableProdMode() to enable the production mode' +
                  'Angular is running in the development mode. Call enableProdMode() to enable the production mode' +
                  'Angular is running in the development mode. Call enableProdMode() to enable the production mode',
    rate: false,
    editMode: false,
  }, {
    id: 5,
    title: 'Title 2',
    duration: 125,
    date: '2018-05-07',
    description: 'Description 2',
    rate: false,
    editMode: false,
  }, {
    id: 6,
    title: 'Title 3',
    duration: 45,
    date: '2018-12-15',
    description: 'Description 3',
    rate: false,
    editMode: false,
  }
];

let renderingListItems: ListItem[] = [];

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor() { }

  public getOriginalListItems(): ListItem[] {
    return originalListItems;
  }

  public getRenderingItems(): ListItem[] {
    return renderingListItems ;
  }

  public setRenderingItems(arr: ListItem[]): void {
    renderingListItems = arr;
  }

  public createListItem() {
    originalListItems.unshift(this.generateNewItem());
  }

  public updateItem(item: ListItem) {
    let updatedItem: ListItem = this.getListItemById(item.id);

    item.date = item.date;

    updatedItem = item;
  }

  public removeListItemById(id: number) {
    originalListItems.splice(_.findIndex(originalListItems, {id: id}), 1);
  }

  private getListItemById(id: number) {
    return _.find(originalListItems, {id: id});
  }

  private generateNewItem() {
    return {
      id: Date.now(),
      title: null,
      duration: Math.floor(Math.random() * (240 - 15)) + 15,
      date: null,
      description: null,
      rate: false,
      editMode: true,
    };
  }
}
