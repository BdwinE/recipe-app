import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { ShowDropdownDirective } from './show-dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinner,
    PlaceHolderDirective,
    DropdownDirective,
    ShowDropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinner,
    PlaceHolderDirective,
    ShowDropdownDirective,
    CommonModule,
  ],
})
export class SharedModules {}
