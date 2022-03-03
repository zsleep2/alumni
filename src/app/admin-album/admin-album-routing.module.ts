import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAlbumComponent } from './admin-album.component';



const adminalbumRoutes: Routes = [
  {
    path:'album/:user_username',
    component:AdminAlbumComponent,
    children:[
     
      {
        path:':album_ID',
      
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(adminalbumRoutes)],
  exports: [RouterModule]
})
export class AdminAlbumRoutingModule { }
