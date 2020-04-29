import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscription: Subscription;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.subscription = this.loadingService.showLoading.subscribe((state) => {
      this.showLoading = state;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
