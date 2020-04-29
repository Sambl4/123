import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse,
         HttpParams, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import { ListItem } from '../model/list-item.model';

let originalListItems:  ListItem[] = [];

let renderingListItems: ListItem[] = [];

const BASE_COURSES_URL = 'http://localhost:3004/courses';
const BASE_USERS_URL = 'http://localhost:3004/users';
@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(private http: HttpClient) { }

  public getList(currentPage: number = 1, pageSize: number, textFragment?: string): Observable<ListItem[]> {
    const params = textFragment ? {
        currentPage: '' + currentPage,
        pageSize: '' + pageSize,
        textFragment: textFragment
      } : {
        currentPage: '' + currentPage,
        pageSize: '' + pageSize
      };

    return this.http.get<ListItem[]>(`${BASE_COURSES_URL}`,
      { params: params });
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_USERS_URL}`);
  }

  public getOriginalListItems(): ListItem[] {
    return originalListItems;
  }

  public getRenderingItems(): ListItem[] {
    return renderingListItems ;
  }

  public setRenderingItems(arr: ListItem[]): void {
    renderingListItems = arr;
  }

  // public createListItem() {
  //   originalListItems.unshift(this.generateNewItem());
  // }
  public createListItem(): Observable<ListItem[]> {
    const params = this.generateNewItem();
    return this.http.post<any>(`${BASE_COURSES_URL}`,
      {params: params});
  }

  public updateItem(item: ListItem) {
    let updatedItemIndex: number = this.getListItemById(item.id);
    originalListItems[updatedItemIndex] = item;
  }

  public removeListItemById(id: number): Observable<ListItem[]> {
    const params = { id: id.toString() };
    return this.http.delete<any>(`${BASE_COURSES_URL}`,
      {params: params});
  }

  public getListItemById(id: number) {
    return _.findIndex(originalListItems, {id: id});
  }

  private generateNewItem() {
    return {
      id: Date.now(),
      title: null,
      duration: Math.floor(Math.random() * (240 - 15)) + 15,
      date: null,
      authors: [],
      description: null,
      rate: false,
      // editMode: true,
    };
  }
}
