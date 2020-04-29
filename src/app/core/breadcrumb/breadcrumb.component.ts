import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: any[] = [];
  private itemId: string;
  private listItemIdFromUrl: string;
  private prevPath: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }
  prepareBreadcrumbItem(elementPath: string) {
    if (elementPath.includes('?')) {
      return;
    }
    let componentName = _.get(_.find(this.router.config, {path: elementPath}), 'component.name');

    if (componentName) {
      this.prevPath = elementPath + '/';
      this.breadcrumbs.push({
        path: elementPath,
        component: componentName.replace('Component', '')
      });
    } else {
      this.breadcrumbs.push({
        path: this.prevPath + elementPath,
        component: elementPath
      });

    }
  }

  ngOnInit() {
    this.router.events.forEach(event => {
      this.breadcrumbs = [];
      if (event instanceof NavigationEnd) {
        let pathElements = _.filter(event.url.split('/'), elem => elem.length > 0);

        this.activatedRoute.queryParams.subscribe((data) => {
            _.forEach(pathElements, elementPath => this.prepareBreadcrumbItem(elementPath));

          if (data['itemId']) {
            this.breadcrumbs.push( {
              path: data['itemId'],
              component: data['itemName']
            });
          }
        });
      }
    });
  }

}
