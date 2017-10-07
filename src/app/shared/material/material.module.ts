import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule, MdChipsModule,
  MdGridListModule,
  MdInputModule,
  MdSelectModule
} from '@angular/material';

@NgModule({
    imports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule,
      MdSelectModule,
      MdChipsModule
    ],
    declarations: [],
    exports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule,
      MdSelectModule,
      MdChipsModule
    ]
}) export class MaterialModule {}
