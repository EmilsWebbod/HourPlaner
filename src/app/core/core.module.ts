import { NgModule } from '@angular/core';
import { BranchComponent } from './branch/branch.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import { BranchHomeComponent } from './branch/branch-home/branch-home.component';
import { BranchUsersComponent } from './branch/branch-users/branch-users.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomeComponent,
    BranchComponent,
    BranchHomeComponent,
    BranchUsersComponent
  ],
  exports: [
    HomeComponent,
    BranchComponent,
    BranchHomeComponent,
    BranchUsersComponent
  ]
})
export class CoreModule { }
