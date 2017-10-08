
import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './menus/register/register.component';
import { LoginComponent } from './menus/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterBranchComponent } from './menus/register-branch/register-branch.component';
import { InputGroupComponent } from './input/input-group/input-group.component';
import { InputPositionComponent } from './input/input-position/input-position.component';
import { InputShiftComponent } from './input/input-shift/input-shift.component';
import { SelectorUserComponent } from './selector/selector-user/selector-user.component';
import { GridPlanComponent } from './grid/grid-plan/grid-plan.component';
import { GridHeaderComponent } from './grid/grid-header/grid-header.component';
import { GridDataComponent } from './grid/grid-data/grid-data.component';
import { GridRowComponent } from './grid/grid-row/grid-row.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    RegisterBranchComponent,
    InputGroupComponent,
    InputPositionComponent,
    InputShiftComponent,
    SelectorUserComponent,

    GridPlanComponent,
    GridHeaderComponent,
    GridDataComponent,
    GridRowComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,

    RegisterComponent,
    LoginComponent,
    RegisterBranchComponent,
    InputGroupComponent,
    InputPositionComponent,
    InputShiftComponent,
    SelectorUserComponent,

    GridPlanComponent,
    GridHeaderComponent,
    GridDataComponent,
    GridRowComponent
  ]
})
export class SharedModule {}
