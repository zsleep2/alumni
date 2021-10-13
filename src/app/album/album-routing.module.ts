import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AlbumComponent} from './album.component';
import {AlbumListComponent} from './album-list.component';
import {AlbumDetailComponent} from './album-detail.component';


const albumRoutes: Routes = [
  {
    path:'album/:user_username',
    component:AlbumComponent,
    children:[
      {
        path:'',
        component:AlbumListComponent
      },
      {
        path:':album_ID',
        component:AlbumDetailComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
