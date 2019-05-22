import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//Bootstrap

//Font-Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faUserAlt, faIdBadge, faUserCircle, faBars, faFolderMinus, faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule
  ],
  declarations: [],
})
export class SharedModule { 
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faBars, faFolderMinus, faChevronCircleDown, faTimes, faUserAlt, faIdBadge, faUserCircle);
  }
}
