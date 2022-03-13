import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Member1RoutingModule } from './member1-routing.module';
import { Member1ListComponent } from './member1-list.component';
import { Member1DetailComponent } from './member1-detail.component';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';


@NgModule({
  declarations: [Member1ListComponent, Member1DetailComponent],
  imports: [
    CommonModule,
    Member1RoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    
  ]
})
export class Member1Module { }
