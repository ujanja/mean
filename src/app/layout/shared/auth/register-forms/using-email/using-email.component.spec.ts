import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingEmailComponent } from './using-email.component';

describe('UsingEmailComponent', () => {
  let component: UsingEmailComponent;
  let fixture: ComponentFixture<UsingEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
