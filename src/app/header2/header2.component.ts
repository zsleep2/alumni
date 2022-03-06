import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
myValue;
user_username;
user_username2;
user_name;
  constructor(private _auth: AuthService,private router: ActivatedRoute,private router1: Router) {
    this.user_username = localStorage.getItem('user_username');
    this.user_username2 = this.user_username.substring(0, 2);
   }
  items: MegaMenuItem[];
  ngOnInit(): void {
    const status = localStorage.getItem('status');
   /*  if(status !== '1'){
      this.router1.navigateByUrl('/login');
    }else{
        this.myValue = this._auth.myData;
    } */

  
   
      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: 'สมาชิก', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' อัลบั้ม ', routerLink:['/album/'+this.user_username]
          
      },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username]
        },  
  ]
  
/*   console.log(this.items); */


}
logOut(){
  this.router1.navigateByUrl('/home');
  localStorage.removeItem('status');
  localStorage.removeItem('user_username');
  localStorage.removeItem('role');
  localStorage.removeItem('uid');
  localStorage.removeItem('password');
}
  }

