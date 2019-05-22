import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from '../auth/auth-guard.service';
import { HomeModule } from '../routes-modules/home/home.module';
import { HomeMainContentComponent } from '../routes-modules/home/home-layout/home-main-content/home-main-content.component';

const routes: Routes = [{
  path: 'home',
  component: HomeMainContentComponent,
  loadChildren: () => HomeModule
  }, 
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
