import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
// import { AuthorizationService } from '../../authorization/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let authorizationService: Partial<AuthorizationService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      // providers: [{provide: AuthorizationService, useValue: authorizationService}]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   authorizationService = { getIsLogged: jasmine.createSpy('MockgetIsLogged')};
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo with image and text', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const divLogo: HTMLElement = nativeElement.querySelector('.logo');

    expect(divLogo.firstChild.nodeName).toEqual('IMG');
    expect(divLogo.lastChild.textContent).toEqual('My logo');
    expect(divLogo.lastElementChild.className).toEqual('logo-name');
  });

  it('should render the login section with button', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const loginSection: HTMLElement = nativeElement.querySelector('.login-section');

    expect(loginSection.children.length).toEqual(1);
    expect(loginSection.firstElementChild.className).toEqual('btn btn-light btn-logout');
  });

  it('should render "username" block after clicking on login button', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const loginSection: HTMLElement = nativeElement.querySelector('.login-section');
    const buttonLogin = fixture.debugElement.query(By.css('.btn.btn-light.btn-logout.btn-logout'));


    expect(loginSection.children.length).toEqual(1);
    buttonLogin.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(loginSection.children.length).toEqual(2);
    expect(loginSection.firstElementChild.className).toEqual('username');
    expect(loginSection.lastElementChild.className).toEqual('btn btn-light btn-logout');
  });

  // it('should initialize login status on OnInit step', () => {
  //   console.log(component.isLogged)
  //   expect(authorizationService.getIsLogged).not.toHaveBeenCalled();

  //   component.ngOnInit();
  //   // fixture.detectChanges();
  //   expect(authorizationService.getIsLogged).toHaveBeenCalled();

  //   console.log(component.isLogged)
  //   // expect(component).toBeTruthy();
  // });

  // function MockgetIsLogged() {
  //   return false
  // }
});
