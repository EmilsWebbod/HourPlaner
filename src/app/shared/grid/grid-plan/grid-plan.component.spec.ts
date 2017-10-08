import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPlanComponent } from './grid-plan.component';

describe('GridPlanComponent', () => {
  let component: GridPlanComponent;
  let fixture: ComponentFixture<GridPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
