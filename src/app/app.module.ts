import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {CarouselModule} from 'primeng/carousel';
import {GalleriaModule} from 'primeng/galleria';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import { Routes, RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import {PasswordModule} from 'primeng/password';
import {PanelModule} from 'primeng/panel';
import {InputMaskModule} from 'primeng/inputmask';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { IgxDatePickerModule } from 'igniteui-angular';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { WebboardModule} from './webboard/webboard.module';
import { AlbumModule} from './album/album.module';
import { FreeapiService } from './freeapi.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';





/* component */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuleftComponent } from './menuleft/menuleft.component';
import { NewLComponent } from './new-l/new-l.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AtComponent } from './at/at.component';
import { FooterComponent } from './footer/footer.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { HomeComponent } from './home/home.component';
import { WebboardComponent } from './webboard/webboard.component';
import { BestComponent } from './best/best.component';
import { AboutComponent } from './about/about.component';
import { Home2Component } from './home2/home2.component';
import { Header2Component } from './header2/header2.component';
import { Menuleft2Component } from './menuleft2/menuleft2.component';
import { HwComponent } from './hw/hw.component';
import { PostComponent } from './post/post.component';
import { ExComponent } from './ex/ex.component';
import { Hearder3Component } from './hearder3/hearder3.component';
import { DcarlenComponent } from './dcarlen/dcarlen.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminAlbumComponent } from './admin-album/admin-album.component';
import { AuthService } from './auth.service';
import { AlbumComponent } from './album/album.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { WebComponent } from './web/web.component';
import { SetComponent } from './set/set.component';
import { Webboard2Component } from './webboard2/webboard2.component';
import { RegisComponent } from './regis/regis.component';
import { RegissComponent } from './regiss/regiss.component';

import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { AppRoutingModule } from './app-routing.module';
import { HometestComponent } from './hometest/hometest.component';
import { NewComponent } from './new/new.component';
import { AddalbumComponent } from './addalbum/addalbum.component';
import { AddativityComponent } from './addativity/addativity.component';
import { AddnewComponent } from './addnew/addnew.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { Home3Component } from './home3/home3.component';
import { AdminDeComponent } from './admin-de/admin-de.component';
import { NewModule } from './new/new.module';
import { AdminNewComponent } from './admin-new/admin-new.component';
import { AdminWebComponent } from './admin-web/admin-web.component';
import { AdminAlbumDetailComponent } from './admin_album/admin-album-detail.component';
import { SettComponent } from './sett/sett.component';
import { AdminBestComponent } from './admin-best/admin-best.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AddbestComponent } from './addbest/addbest.component';
import { ResetpassComponent } from './resetpass/resetpass.component';


/* const appRoust: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {path: '',component: AppComponent},
  {path: 'login',component: LoginComponent},
  {path: 'member1/:user_username',component: Member1Component},
  {path: 'member2/:user_username',component: Member2Component},
  {path: 'home',component: HomeComponent},
  {path: 'webboard/:user_username',component: WebboardComponent},
  {path: 'best/:user_username',component: BestComponent},
  {path: 'about/:user_username',component: AboutComponent},
  {path: 'home2/:user_username',component: Home2Component},
  {path: 'post/:user_username',component: PostComponent},
  {path: 'ex',component: ExComponent},
  {path:'admin/:user_username',component: AdminComponent},
  {path:'admin_user/:user_username',component: AdminUserComponent},
  {path:'admin_de/:user_username',component: AdminDeComponent},
  {path:'admin_album/:user_username',component: AdminAlbumComponent},
  {path:'admin_new/:user_username',component: AdminNewComponent},
  {path:'admin_web/:user_username',component: AdminWebComponent},
  {path:'admin_best/:user_username',component: AdminBestComponent},
  {path:'admin_about/:user_username',component: AdminAboutComponent},
  {path:'muneleft2',component:Menuleft2Component},
  {path:'album/:user_username',component:AlbumComponent},
  {path:'web',component:WebComponent},
  {path:'set/:user_username',component:SetComponent},
  {path:'sett/:user_username',component:SettComponent},
  {path: 'webboard2/:user_username',component: Webboard2Component},
  {path: 'regis',component: RegisComponent},
  {path: 'regiss',component: RegissComponent},

  {path:'hometest',component:HometestComponent},
  {path:'addalbum/:user_username',component:AddalbumComponent},
  {path:'addativity/:user_username',component:AddativityComponent},
  {path:'addnew/:user_username',component:AddnewComponent},
  {path:'home3/:user_username',component:Home3Component},
  {path:'new/:user_username',component:NewComponent},
  {path: '**', component: PagenofoundComponent }
  
  
]; */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuleftComponent,
    NewLComponent,
    CalendarComponent,
    AtComponent,
    FooterComponent,
    Member1Component,
    Member2Component,
    HomeComponent,
    WebboardComponent,
    BestComponent,
    AboutComponent,
    Home2Component,
    Header2Component,
    Menuleft2Component,
    HwComponent,
    PostComponent,
    ExComponent,
    Hearder3Component,
    DcarlenComponent,
    AdminComponent,
    AdminUserComponent,
    AdminAlbumComponent,
    AlbumComponent,
    WebComponent,
    SetComponent,
    Webboard2Component,
    RegisComponent,
    RegissComponent,
    PagenofoundComponent,
    HometestComponent,
    NewComponent,
    AddalbumComponent,
    AddativityComponent,
    AddnewComponent,
    FilterPipe,
    Home3Component,
    AdminDeComponent,
    AdminNewComponent,
    AdminWebComponent,
    AdminAlbumDetailComponent,
    SettComponent,
    AdminBestComponent,
    AdminAboutComponent,
    AddbestComponent,
    ResetpassComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    CalendarModule,
    CarouselModule,
    GalleriaModule,
    MegaMenuModule,
    MenubarModule,
    TabMenuModule,
   /*  RouterModule.forRoot(appRoust), */
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    InputTextareaModule,
    EditorModule,
    PasswordModule,
    PanelModule,
    InputMaskModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FullCalendarModule,
    IgxDatePickerModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule, AppRoutingModule,
    WebboardModule,
    AlbumModule,
    NewModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
   // RouterModule
  ],
  
  providers: [AuthService,FreeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

