import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-menuleft2',
  templateUrl: './menuleft2.component.html',
  styleUrls: ['./menuleft2.component.css']
})
export class Menuleft2Component implements OnInit {

  myValue;

  constructor( private _auth: AuthService ) { }

  ngOnInit(): void {
  
  }

}
