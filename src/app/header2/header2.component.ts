import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private _auth: AuthService,private router: ActivatedRoute,private router2: ActivatedRoute) {
    this.user_username = router.snapshot.params['user_username'];
    this.user_username2 = this.user_username.substring(0, 2);
   }
  items: MegaMenuItem[];
  ngOnInit(): void {
    
    this.myValue = this._auth.myUser;
    console.log(this.user_username2);
   
      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: 'นักศึกษา', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' อัลบั้มรูปภาพ ', routerLink:['/album/'+this.user_username]
          
      },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username]
        },
        {
          label:'ออกจากระบบ', routerLink:['/home']
        }
  ]
    
    
    


}
  }

