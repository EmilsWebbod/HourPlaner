import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
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
      MdSelectModule
    ],
    declarations: [],
    exports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule,
      MdSelectModule
    ]
}) export class MaterialModule {}
