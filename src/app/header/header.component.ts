import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  items: MegaMenuItem[];
  ngOnInit(): void {
    this.items = [
      {
        label: ' หน้าแรก ', routerLink:['/home']
      },
      {
          label: ' สมาชิก ', routerLink:['/login'],
         
      },
      {
        label: ' อัลบั้ม ', routerLink:['/login'],
        
    },
      {
          label: ' เว็บบอร์ด ', routerLink:['/login']
      }
  ]
}
  }


