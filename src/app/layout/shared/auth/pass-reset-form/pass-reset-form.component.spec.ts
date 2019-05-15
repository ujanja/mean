import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassResetFormComponent } from './pass-reset-form.component';

describe('PassResetFormComponent', () => {
  let component: PassResetFormComponent;
  let fixture: ComponentFixture<PassResetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassResetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
