import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';


@Injectable()
export class CanActivateList implements CanActivate {
public subscription: Subscription;
private isAuthenticated: any;
  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let redirectedUrl = state.url;
    this.authorizationService.isAuthenticated
                      .subscribe(result => this.isAuthenticated = result ? true : false);
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['../auth'], {queryParams: {redirectedFrom: redirectedUrl}});
      return false;
    }
  }
}
