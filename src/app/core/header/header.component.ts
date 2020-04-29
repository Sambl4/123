import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit, OnDestroy {
@Input() public hideByUrl: boolean;
  public userName: string;
  public subscription: Subscription;

  isLogged: boolean;
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.authorizationService.isAuthenticated
                      .subscribe(result => this.isLoggedUpdate(result));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isAuthenticatedDetect(state: boolean) {
    console.log('state', state);
  }

  logout() {
    this.authorizationService.Logout();
  }

  private isLoggedUpdate(result: boolean) {
    if (result) {
      const userInfo = this.authorizationService.GetActiveUserInfo();
      this.userName = userInfo.firstName + ' ' + userInfo.lastName;
    } else {
      // this.router.navigate(['../auth']);
    }
    this.isLogged = result;

  }
}
