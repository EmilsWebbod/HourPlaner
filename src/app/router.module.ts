import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {BranchComponent} from './core/branch/branch.component';
import {BranchHomeComponent} from './core/branch/branch-home/branch-home.component';
import {BranchUsersComponent} from './core/branch/branch-users/branch-users.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':branch', component: BranchComponent, children: [
    {path: '', component: BranchHomeComponent},
    {path: 'users', component: BranchUsersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
