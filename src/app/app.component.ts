import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public hideByUrl: boolean;
  constructor(private router: Router) {
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.hideByUrl = event.url === '/auth' || event.url === '/page404';
        }});
    }
}
