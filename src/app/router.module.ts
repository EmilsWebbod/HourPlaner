import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {BranchComponent} from './core/branch/branch.component';
import {BranchHomeComponent} from './core/branch/branch-home/branch-home.component';
import {BranchUsersComponent} from './core/branch/branch-users/branch-users.component';
import {BranchSettingsComponent} from './core/branch/branch-settings/branch-settings.component';
import {BranchNewPlanComponent} from './core/branch/branch-new-plan/branch-new-plan.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':branch', component: BranchComponent, children: [
    {path: '', component: BranchHomeComponent},
    {path: 'users', component: BranchUsersComponent},
    {path: 'settings', component: BranchSettingsComponent},
    {path: 'new', component: BranchNewPlanComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
