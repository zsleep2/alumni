import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/api';

interface Articles{
  'user_username':string,
   'user_user_prefix':string,
  'user_name':string,
  'user_email':string,
  'user_phone':string,
  'user_facebook':string,
  'user_status':number,
  'UID':number
}


@Component({
  selector: 'app-member1-detail',
  templateUrl: './member1-detail.component.html',
  styleUrls: ['./member1-detail.component.css']
})
export class Member1DetailComponent implements OnInit {
  user_username: string;
  user_username2: string;
  myrole: string;
  items: { label: string; routerLink: string[]; }[];
  userID: number;
  activePage: number;
  uid: string;
  results: Articles[];
  public urlSource:string = "http://qpos.msuproject.net/AllNewService/user/result";

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router4: ActivatedRoute) {
      this.user_username = localStorage.getItem('user_username');;
      }


  ngOnInit(): void {
    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
      this.user_username2 = this.user_username.substring(0, 2);
      this.myrole = localStorage.getItem('role');
    }
      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: 'สมาชิก', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' อัลบั้ม ', routerLink:['/album/'+this.user_username]
        },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username]
        },
        
  ]
    
    


    let params = this.router.snapshot.paramMap;
    if(params.has('UID')){
      this.userID = +params.get('UID');
    }
    this.router
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
      }
    });  
    this.uid = params.get('UID');

    this.http.get<Articles[]>(this.urlSource)
    .subscribe(
      data => {
        // กรณี resuponse success
        this.results = data.filter( res => {
          return res.UID == this.userID;
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

  logOut(){
    this.router1.navigateByUrl('/home');
    localStorage.removeItem('status');
    localStorage.removeItem('user_username');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    localStorage.removeItem('password');
  
  }

}
