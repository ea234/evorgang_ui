
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './components/login/login';
import { ApplicationSelection } from './components/application-selection/application-selection';
import { Vorgangssteuerung } from './app_vorgang/components/vorgangssteuerung/vorgangssteuerung';
import { Vorgangsbearbeitung } from './app_vorgang/components/vorgangsbearbeitung/vorgangsbearbeitung';

import { authGuard } from './user/service/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'evorgang',
    canActivate: [ authGuard ],
    children: [
      {
        path: '',
        component: ApplicationSelection
      },
      {
        path: 'vorgang',
        component: Vorgangssteuerung
      },
      {
        path: 'vorgang/:id',
        component: Vorgangsbearbeitung
      }
    ]
  },
  {
    path: '',
    redirectTo: 'evorgang',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'evorgang'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
