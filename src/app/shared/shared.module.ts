import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//Bootstrap

//Font-Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faEnvelope, faBell,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    NgbModule,
  ],
  declarations: [],
})
export class SharedModule { 
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faHome, faBell, faEnvelope);
  }
}
