import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hearder3',
  templateUrl: './hearder3.component.html',
  styleUrls: ['./hearder3.component.css']
})
export class Hearder3Component implements OnInit {
  user_username;
  myValue;
  constructor(private router: ActivatedRoute) {
    this.user_username = router.snapshot.params['user_username'];
   }
  items: MegaMenuItem[];
  ngOnInit(): void {

  this.items = [
      {
        label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
      },
      {
          label: 'นักศึกษา', routerLink:['/member1/'+this.user_username],
         
      },
      
      {
        label: ' อัลบั้มรูปภาพ ', routerLink:['/album/'+this.user_username],
        
    },
      {
          label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username],
      },
      {
        label:'ออกจากระบบ', routerLink:['/home'],
      }
  ]

  }

}
