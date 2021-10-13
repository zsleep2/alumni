import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebboardComponent } from './webboard.component';

import { WebboardListComponent } from './webboard-list.component';
import { WebboardDetailComponent } from './webboard-detail.component';

const routes: Routes = [
  {
    path:'webboard/:user_username',
    component:WebboardComponent,
    children:[
      {
        path:'',
        component:WebboardListComponent
      },
      {
        path:':webboard_ID',
        component:WebboardDetailComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebboardRoutingModule { }
