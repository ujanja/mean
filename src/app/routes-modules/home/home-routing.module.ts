import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeContentComponent } from '../../page-components/for-home-route/some-content/some-content.component';

const routes: Routes = [

    {
      path: '',
      component: SomeContentComponent, 
    },
    {
      path: 'user-profile/:_id',
      component: SomeContentComponent,
    },
    {
      path: 'verifyEmail/:emailVerificationSecretToken/:user_id',
      component: SomeContentComponent,
    },
    {
      path: 'resetPass/:passResetToken',
      component: SomeContentComponent,
    },
  
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {}
