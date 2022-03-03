import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAlbumRoutingModule } from './admin-album-routing.module';


import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminAlbumRoutingModule,
    MenubarModule,
    ButtonModule
  ]
})
export class AdminAlbumModule { }
