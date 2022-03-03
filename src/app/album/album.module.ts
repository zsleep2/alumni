import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumListComponent } from './album-list.component';
import { AlbumDetailComponent } from './album-detail.component';

import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    MenubarModule,
    ButtonModule,
    FormsModule,
    DataViewModule,
    NgxPaginationModule
  ]
})
export class AlbumModule { }
