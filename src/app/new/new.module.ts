import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewListComponent } from './new-list.component';
import { NewDetailComponent } from './new-detail.component';

import {MenubarModule} from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewListComponent, NewDetailComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    MenubarModule,
    ButtonModule,
    FormsModule 
  ]
})
export class NewModule { }
