import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule, MdChipsModule,
  MdGridListModule,
  MdInputModule,
  MdSelectModule, MdSnackBarModule,
  MdCheckboxModule, MdAutocompleteModule, MdTabsModule
} from '@angular/material';

@NgModule({
    imports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule,
      MdSelectModule,
      MdChipsModule,
      MdSnackBarModule,
      MdCheckboxModule,
      MdAutocompleteModule,
      MdTabsModule
    ],
    declarations: [],
    exports: [
      MdCardModule,
      MdGridListModule,
      MdInputModule,
      MdButtonModule,
      MdSelectModule,
      MdChipsModule,
      MdSnackBarModule,
      MdCheckboxModule,
      MdAutocompleteModule,
      MdTabsModule
    ]
}) export class MaterialModule {}
