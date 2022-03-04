import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Member1Component } from './member1.component';
import { Member1ListComponent } from './member1-list.component';
import { Member1DetailComponent } from './member1-detail.component';

const memberRoutes: Routes = [
  {
    path:'member1/:user_username',
    component:Member1Component,
    children:[
      {
        path:'',
        component:Member1ListComponent
      },
      {
        path:':UID',
        component:Member1DetailComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(memberRoutes)],
  exports: [RouterModule]
})
export class Member1RoutingModule { }
