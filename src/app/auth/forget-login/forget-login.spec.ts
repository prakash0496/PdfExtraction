import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetLogin } from './forget-login';

describe('ForgetLogin', () => {
  let component: ForgetLogin;
  let fixture: ComponentFixture<ForgetLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
