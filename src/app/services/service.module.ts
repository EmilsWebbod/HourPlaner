
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
import {ResponseService} from './response/response.service';
import {UserService} from './user.service';
import {AppService} from './app.service';
import {BranchService} from '../core/branch/branch.service';
import {GridService} from '../shared/grid/grid.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        ResponseService,
        ServerService,
        UserService,
        AppService,
        BranchService,
        GridService
      ]
    };
  }
}
