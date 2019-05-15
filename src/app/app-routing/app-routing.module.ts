import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from '../auth/auth-guard.service';
import { ContainerComponent } from '../layout/container/container.component';

const routes: Routes = [{
  path: '',
  component: ContainerComponent
},/* {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
},*/ {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
