import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, DebugElement } from '@angular/core';
import { formatDate } from '@angular/common';
import { By } from '@angular/platform-browser';

import { ListItemComponent } from './list-item.component';
import { ListItem } from '../../model/list-item.model';

import { BorderHighlightDirective } from '../../share/directives/highlight.directive';
import { DurationFormatPipe } from '../../share/pipe/duration-format.pipe';

@Component({
  template:`
  <app-list-item
    [listItem]="listItem"
    (deleteItemById)="deleteItemByIdSpy($event)">
  </app-list-item>
  `
})

class TestHostComponent implements OnInit {
  deleteItemByIdSpy: jasmine.Spy;

  public listItem: ListItem = {
    id: 1,
    title: 'test title',
    date: new Date(),
    description: 'test descroption',
    duration: 15,
    rate: true
  }

  ngOnInit() {}

  deleteItem(id: number) {
    this.deleteItemByIdSpy = jasmine.createSpy('deleteItemByIdSpy')
  }
}

describe('ListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let listItem: ListItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListItemComponent,
        TestHostComponent,
        BorderHighlightDirective,
        DurationFormatPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct template', () => {
    // const nativeElement: HTMLElement = fixture.nativeElement;
    const cardTitle: HTMLElement = fixture.nativeElement.querySelector('.card-title');
    const cardHeaderInfo: HTMLElement = fixture.nativeElement.querySelector('.card-header-info');
    const cardDescription: HTMLElement = fixture.nativeElement.querySelector('.card-description');
    const cardControlSection: HTMLElement = fixture.nativeElement.querySelector('.card-control-section');

    expect(cardTitle.textContent).toEqual(component.listItem.title.toUpperCase() + ' ');
    expect(cardHeaderInfo.firstChild.textContent).toEqual(component.listItem.duration.toString() + ' min.');
    expect(cardHeaderInfo.lastChild.textContent).toEqual(formatDate(component.listItem.date.toString(), 'dd.MM.yyyy', 'en-US'));
    expect(cardDescription.textContent).toEqual(component.listItem.description);
    expect(cardControlSection.firstChild.textContent).toEqual('Edit');
    expect(cardControlSection.lastChild.textContent).toEqual('Delete');
  });

  it('should have blue border', () => {
    const item: HTMLElement = fixture.nativeElement.querySelector('.card-section');
    const borderColor = item.style.border;

    expect(borderColor).toBe('1px solid blue');
  });

  it('should delete item by id', () => {
    const expectedDeletedItem = {
      id: 1,
      title: 'test title'
    };

    const deleteButton = fixture.debugElement.query(By.css('.btn-outline-danger'));
    deleteButton.triggerEventHandler('click', null);
    expect(component.listItem.title).toEqual(expectedDeletedItem.title);
  });
});
