import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddalbumComponent } from './addalbum/addalbum.component';
import { AddativityComponent } from './addativity/addativity.component';
import { AddnewComponent } from './addnew/addnew.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AdminAlbumComponent } from './admin-album/admin-album.component';
import { AdminBestComponent } from './admin-best/admin-best.component';
import { AdminDeComponent } from './admin-de/admin-de.component';
import { AdminNewComponent } from './admin-new/admin-new.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminWebComponent } from './admin-web/admin-web.component';
import { AdminComponent } from './admin/admin.component';
import { AlbumComponent } from './album/album.component';
import { BestComponent } from './best/best.component';
import { ExComponent } from './ex/ex.component';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { Home3Component } from './home3/home3.component';
import { HometestComponent } from './hometest/hometest.component';
import { LoginComponent } from './login/login.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { Menuleft2Component } from './menuleft2/menuleft2.component';
import { NewComponent } from './new/new.component';
import { PostComponent } from './post/post.component';
import { RegisComponent } from './regis/regis.component';
import { RegissComponent } from './regiss/regiss.component';
import { SetComponent } from './set/set.component';
import { SettComponent } from './sett/sett.component';
import { WebComponent } from './web/web.component';
import { WebboardComponent } from './webboard/webboard.component';
import { Webboard2Component } from './webboard2/webboard2.component';
import { WebboardModule } from './webboard/webboard.module';
import { AlbumModule } from './album/album.module';
import { NewModule } from './new/new.module';

const appRoust: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '',component: AppComponent},
  { path: 'login', component: LoginComponent },
  { path: 'member1/:user_username', component: Member1Component },
  { path: 'member2/:user_username', component: Member2Component },
  { path: 'home', component: HomeComponent },
  { path: 'webboard/:user_username', component: WebboardComponent },
  { path: 'best/:user_username', component: BestComponent },
  { path: 'about/:user_username', component: AboutComponent },
  { path: 'home2/:user_username', component: Home2Component },
  { path: 'post/:user_username', component: PostComponent },
  { path: 'ex', component: ExComponent },
  { path: 'admin/:user_username', component: AdminComponent },
  { path: 'admin_user/:user_username', component: AdminUserComponent },
  { path: 'admin_de/:user_username', component: AdminDeComponent },
  { path: 'admin_album/:user_username', component: AdminAlbumComponent },
  { path: 'admin_new/:user_username', component: AdminNewComponent },
  { path: 'admin_web/:user_username', component: AdminWebComponent },
  { path: 'admin_best/:user_username', component: AdminBestComponent },
  { path: 'admin_about/:user_username', component: AdminAboutComponent },
  { path: 'muneleft2', component: Menuleft2Component },
  { path: 'album/:user_username', component: AlbumComponent },
  { path: 'web', component: WebComponent },
  { path: 'set/:user_username', component: SetComponent },
  { path: 'sett/:user_username', component: SettComponent },
  { path: 'webboard2/:user_username', component: Webboard2Component },
  { path: 'regis', component: RegisComponent },
  { path: 'regiss', component: RegissComponent },
  { path: 'hometest', component: HometestComponent },
  { path: 'addalbum/:user_username', component: AddalbumComponent },
  { path: 'addativity/:user_username', component: AddativityComponent },
  { path: 'addnew/:user_username', component: AddnewComponent },
  { path: 'home3/:user_username', component: Home3Component },
  { path: 'new/:user_username', component: NewComponent },
  // {path: '**', component: PagenofoundComponent }
];


@NgModule({
  // declarations: [],
  imports: [
    RouterModule.forRoot(appRoust, { useHash: true }),
    WebboardModule,
    AlbumModule,
    NewModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }