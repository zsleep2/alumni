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
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {
  myValue;
  user_username:any;
  aboutTitle;
  aboutDescription;
  aboutMap;
  results;
  aboutID;
  show:boolean = false;
  constructor(private _auth: AuthService,
    private http: HttpClient,
    private router: ActivatedRoute,
    private router1: Router,) { 
    this.user_username = localStorage.getItem('user_username');
  }

  ngOnInit(): void {


    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
    }

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
    this.show = !this.show;
   
  }

  editAbout(){
   /*  this.aboutTitle = this.results[0].about_title;
    this.aboutDescription = this.results[0].about_description;
    this.aboutMap = this.results[0].about_image; */
    this.aboutID = 1;
    let json ={
      about_title : this.aboutTitle || this.results[0].about_title,
      about_description : this.aboutDescription || this.results[0].about_description,
      about_image : this.aboutMap ||this.results[0].about_image
    }
    console.log(json);

    this.http.post('http://qpos.msuproject.net/AllNewService/about/edit/'+this.aboutID,JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            }
            else{
              this.ngOnInit();
            
            }       
         
      }, error =>{
        alert('fail');
      });
  }

  getFile(files : FileList){
    console.log(files.item(0).name);
    let file = files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      /*   console.log(reader.result); */
      this.aboutMap = reader.result;
    };
  }

}
