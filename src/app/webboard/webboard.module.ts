import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebboardRoutingModule } from './webboard-routing.module';
import { WebboardListComponent } from './webboard-list.component';
import { WebboardDetailComponent } from './webboard-detail.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WebboardListComponent,  WebboardDetailComponent],
  imports: [
    CommonModule,
    WebboardRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule
  ]
})
export class WebboardModule { }
