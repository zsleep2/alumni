import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public show : boolean = false;
  myValue;
  myrole;
  constructor( private _auth: AuthService,
    private http: HttpClient,
    private router: ActivatedRoute,) { }

  ngOnInit(): void {  

    this.myValue = this._auth.myData;
    this.myrole = this.myValue[0].user_role;
    console.log(this.myrole);
  }

  toggle() {
   
       
  }

}
