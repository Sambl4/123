import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListService } from '../list.service';

import { ListComponent } from './list.component';
import { ListItem } from '../../model/list-item.model';

import { OrderBycreationDatePipe } from '../../share/pipe/my-orderby.pipe';

@Component({
  selector: 'app-searchbar',
  template: ''
})
class MockSearchbarComponent {
}

@Component({
  selector: 'app-list-item',
  template: ''
})
class MockListItemComponent {
  @Input() listItem: ListItem;
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listService: Partial<ListService>;

  beforeEach(() => {
    listService = { getOriginalListItems: jasmine.createSpy('getListItems')};
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        MockListItemComponent,
        MockSearchbarComponent,
        OrderBycreationDatePipe
      ],
      providers: [{provide: ListService, useValue: listService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
