import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNewPlanComponent } from './branch-new-plan.component';

describe('BranchNewPlanComponent', () => {
  let component: BranchNewPlanComponent;
  let fixture: ComponentFixture<BranchNewPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchNewPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchNewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
