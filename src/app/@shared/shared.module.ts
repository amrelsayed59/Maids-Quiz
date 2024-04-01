import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RtlDirective } from './directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    RtlDirective,
    CardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    RouterModule,
    TranslateModule,
    RtlDirective,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
