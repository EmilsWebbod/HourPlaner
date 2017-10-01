
import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector:    'app-home',
  templateUrl: './home.component.html',
  styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  branches: Array<any> = [];

  constructor(private _app: AppService) {}

  ngOnInit() {
    this._app.getBranches().then(x => this.branches = x);
  }
}
