import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputShiftComponent } from './input-shift.component';

describe('InputShiftComponent', () => {
  let component: InputShiftComponent;
  let fixture: ComponentFixture<InputShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
