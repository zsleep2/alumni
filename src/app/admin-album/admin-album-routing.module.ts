import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAlbumComponent } from './admin-album.component';
import { AdminAlbumDetailComponent } from '../admin_album/admin-album-detail.component';


const adminalbumRoutes: Routes = [
  {
    path:'album/:user_username',
    component:AdminAlbumComponent,
    children:[
     
      {
        path:':album_ID',
        component:AdminAlbumDetailComponent
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(adminalbumRoutes)],
  exports: [RouterModule]
})
export class AdminAlbumRoutingModule { }
