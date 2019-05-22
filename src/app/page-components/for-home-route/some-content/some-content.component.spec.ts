import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeContentComponent } from './some-content.component';

describe('SomeContentComponent', () => {
  let component: SomeContentComponent;
  let fixture: ComponentFixture<SomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
