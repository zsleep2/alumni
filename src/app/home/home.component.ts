import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface lstNew{
  'new_ID': number;
  'new_date': string;
  'new_description': string;
  'new_image': string;
  'new_title': string;
  'new_status':number;
 }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myValue;
  user_username;
  new={};
  imageToShow:any;
  myURL:any
  allnew;
  title:string;
  des:string;
  fname:string;

  public urlApi:string = "http://qpos.msuproject.net/AllNewService/new/addnew";
  public responseValue:any;  

  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService) {
      
     }

  ngOnInit(): void {
    this.http.get<lstNew[]>('http://qpos.msuproject.net/AllNewService/new/shownew').subscribe(
      data => {
        this.allnew = data.filter( anew =>{
          return anew.new_status == 1;
      });
    
       }, error => {
      }); 
  }

}
