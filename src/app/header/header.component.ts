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
          label: ' นักศึกษาปัจจุบัน ', routerLink:['/login'],
          items: [
              [
                  {
                      items: [{label: 'รายชื่อนักศึกษา'}, {label: 'รูปภาพ'}]
                  },
          ] 
        ]
      },
      {
          label: 'ศิษย์เก่า', routerLink:['/login'],
          items: [
              [
                  {
                      items: [{label: 'รายชื่อศิษย์เก่า'}, {label: 'รูปภาพ'}]
                  },
                 
              ]
          ]
      },
      {
        label: ' อัลบั้มรูปภาพ ', routerLink:['/album'],
        
    },
      {
          label: ' เว็บบอร์ด ', routerLink:['/login']
      }
  ]
}
  }


