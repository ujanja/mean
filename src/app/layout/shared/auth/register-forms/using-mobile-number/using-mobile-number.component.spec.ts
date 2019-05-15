import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingMobileNumberComponent } from './using-mobile-number.component';

describe('UsingMobileNumberComponent', () => {
  let component: UsingMobileNumberComponent;
  let fixture: ComponentFixture<UsingMobileNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingMobileNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
