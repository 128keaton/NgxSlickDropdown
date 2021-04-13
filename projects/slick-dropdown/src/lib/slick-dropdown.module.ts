import {NgModule} from '@angular/core';
import {SlickDropdownComponent} from './slick-dropdown.component';
import {CommonModule} from '@angular/common';
import {SlickOptionComponent} from './option/slick-option.component';


@NgModule({
  declarations: [
    SlickDropdownComponent,
    SlickOptionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlickDropdownComponent,
    SlickOptionComponent
  ]
})
export class SlickDropdownModule {
}
