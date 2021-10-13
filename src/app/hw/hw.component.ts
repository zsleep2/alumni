import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hw',
  templateUrl: './hw.component.html',
  styleUrls: ['./hw.component.css']
})
export class HwComponent implements OnInit {

  myValue;
  user_username;

  constructor(private _auth: AuthService,private router: ActivatedRoute) { 

    this.user_username = router.snapshot.params['user_username'];
    
  }

  items: MenuItem[];

  ngOnInit(): void {

    this.myValue = this._auth.myUser;

    this.items = [
      {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username],
    
      },
      {
          label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username],
      },
      {
          label: 'Post', routerLink:['/post/'+this.user_username],
      },

      
      /* {separator:true}, */
  ];
}
}
