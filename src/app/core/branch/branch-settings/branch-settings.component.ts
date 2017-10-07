import { Component, OnInit } from '@angular/core';
import {BranchService} from '../branch.service';
import {ENTER} from '@angular/cdk/keycodes';
const COMMA = 188;
import {MdChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-branch-settings',
  templateUrl: './branch-settings.component.html',
  styleUrls: ['./branch-settings.component.css']
})
export class BranchSettingsComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];

  add(positions: Array<string>, event: MdChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      positions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  constructor(public _branch: BranchService) { }

  ngOnInit() {
  }

  save(data: any) {
    console.log('Settings', data);
    this._branch.update(this._branch.branch.prop.code, data).then(x => {
      console.log('updated', x);
    });
  }
}
