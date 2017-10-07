
import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './menus/register/register.component';
import { LoginComponent } from './menus/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterBranchComponent } from './menus/register-branch/register-branch.component';
import { InputGroupComponent } from './input/input-group/input-group.component';

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
    InputGroupComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,

    RegisterComponent,
    LoginComponent,
    RegisterBranchComponent,
    InputGroupComponent
  ]
})
export class SharedModule {}
