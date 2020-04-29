import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  console.log = jasmine.createSpy('log');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should log searchValue and then clear input field', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const inputElement: HTMLElement = nativeElement.querySelector('.search');
    const buttonSearch = fixture.debugElement.query(By.css('.btn.btn-outline-success.my-1'));

    expect(component.searchValue).toBeFalsy();
    inputElement.nodeValue = 'test';

    buttonSearch.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.searchValue).toBeFalsy();
  });
});
