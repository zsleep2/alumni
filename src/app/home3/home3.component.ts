import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.css']
})
export class Home3Component implements OnInit {

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

      this.user_username = router.snapshot.params['user_username'];
     }

     onSubmit(f:any){
      let data = f.value;
      console.log(data);
      this.http.post(this.urlApi,JSON.stringify(data))    
      .subscribe(result =>{
        this.responseValue = result;
        console.log(result);
      },
      ( err:HttpErrorResponse ) => {
        // กรณี error
        if (err.error instanceof Error) {
          // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
          console.log('An error occurred:', err.error.message);
        }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }       
      });
    }

  ngOnInit(): void {

    this.myValue = this._auth.myData;
      console.log(this.myValue);

      this.http.get('http://qpos.msuproject.net/AllNewService/new/shownew').subscribe(
        data => {
          this.allnew = data;
          console.log(data);
         }, error => {
        }); 
  }

  openForm1() {
    document.getElementById("myForm1").style.display = "block";
  }
  
  closeForm1() {
    document.getElementById("myForm1").style.display = "none";
  }
  

}
