import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface lstAbout{
  'about_ID': number;
  'about_title': string;
  'about_description': string;
  'about_image': string;

 }


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public show : boolean = false;
  myValue;
  myrole;
  results;
  constructor( private _auth: AuthService,
    private http: HttpClient,
    private router: ActivatedRoute,
    private router1: Router) {
      
     }

  ngOnInit(): void {  

    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
     this.myrole = localStorage.getItem('role');
    }
    console.log(this.myrole);

    this.http.get<lstAbout[]>('http://qpos.msuproject.net/AllNewService/about/showabout')
    .subscribe(
      data => {
        console.log(data);
        // กรณี resuponse success
       
        this.results = data.filter( res => {
          
          return res.about_ID == 1;

        });
      },
      ( err:HttpErrorResponse ) => {
        // กรณี error
        if (err.error instanceof Error) {
          // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
          console.log('An error occurred:', err.error.message);
        }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }       
      }    
    );
  }

  toggle() {
   
       
  }

}
