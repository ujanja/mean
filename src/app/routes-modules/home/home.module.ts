import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SomeContentComponent } from '../../page-components/for-home-route/some-content/some-content.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    
  ],
  declarations: [
    SomeContentComponent
  ],
  providers: [
    // AuthService,
  ],
  
})
export class HomeModule { }
