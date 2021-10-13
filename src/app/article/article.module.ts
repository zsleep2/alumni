import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';


@NgModule({
  declarations: [ArticleComponent, ArticleListComponent, ArticleDetailComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
