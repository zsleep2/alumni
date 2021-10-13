import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAlbumRoutingModule } from './admin-album-routing.module';
import { AdminAlbumDetailComponent } from '../admin_album/admin-album-detail.component';

import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [AdminAlbumDetailComponent],
  imports: [
    CommonModule,
    AdminAlbumRoutingModule,
    AdminAlbumDetailComponent,
    MenubarModule,
    ButtonModule
  ]
})
export class AdminAlbumModule { }
