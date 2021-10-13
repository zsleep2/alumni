import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './new.component';
import { NewListComponent } from './new-list.component';
import { NewDetailComponent } from './new-detail.component';

const newRoutes: Routes = [
  {
    path:'new/:user_username',
    component:NewComponent,
    children:[
      {
        path:'',
        component:NewListComponent
      },
      {
        path:':new_ID',
        component:NewDetailComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
