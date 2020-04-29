import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _showLoading = new Subject<boolean>();
  public showLoading = this._showLoading.asObservable();

  constructor() { }
  showLoader() {
    this._showLoading.next(true);
  }

  hideLoader() {
    this._showLoading.next(false);
  }

}
