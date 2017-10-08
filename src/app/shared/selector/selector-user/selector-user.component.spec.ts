import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorUserComponent } from './selector-user.component';

describe('SelectorUserComponent', () => {
  let component: SelectorUserComponent;
  let fixture: ComponentFixture<SelectorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
