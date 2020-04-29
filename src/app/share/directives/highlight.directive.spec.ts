import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BorderHighlightDirective } from './highlight.directive';

const greenBorderDate = new Date(Date.now() - 86400000 * 2);
const blueBorderDate = new Date(Date.now() + 86400000 * 2);
const greyBorderDate = new Date();

@Component({
  template: `
  <h1 [appBorderHighlighter] = "${greenBorderDate}"></h1>
  <h2 [appBorderHighlighter] = "${blueBorderDate}"></h2>
  <h3 [appBorderHighlighter] = "${greyBorderDate}"></h3>`
})
class TestComponent { }

describe('BorderHighlightDirective', () => {
  let component: BorderHighlightDirective;
  let fixture: ComponentFixture<BorderHighlightDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderHighlightDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderHighlightDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fixture.detectChanges();

  // all elements with an attached HighlightDirective
  const elements = fixture.debugElement.queryAll(By.directive(BorderHighlightDirective));

  it('should set green border if time frame is less than 14 days', () => {
  const borderColor = elements[0].nativeElement.style.border;
  expect(borderColor).toBe('1px solid green');
  });

  it('should set blue border if time frame is from future', () => {
  const borderColor = elements[1].nativeElement.style.border;
  expect(borderColor).toBe('1px solid blue');
  });

  it('should set grey border if time frame is more than 14 days', () => {
  const borderColor = elements[1].nativeElement.style.border;
  expect(borderColor).toBe('1px solid grey');
  });
});


