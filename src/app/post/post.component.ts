import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

interface Articles{
  user_username:string,
  user_password :string ,
  user_phone :string,
  user_email :string,
  user_facebook :string,
  user_year : string,
  user_job : string,
  user_workname : string,
  user_workaddress : string,
  user_workphone : string,
  user_status : number,
  user_best : string,
  user_role : string
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  
})
export class PostComponent implements OnInit {
  text: string;
  text2: string;
  tag;
  posts: any; 
  uid;
  myValue;
  myUser;
  myPost;
  myName;
  user_username;
  user_name;
  normal;
  nrSelect;
  user_id;
  user_username2;
  public myrole;
  localUser;
  eyear: number;
  syear: number;
  public year:number[]=[];
  rawData = [];
  min:number;
  rUser;
  max: number;
  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService) { 
 
    this.user_username = localStorage.getItem('user_username');
    this.user_username2 = this.user_username.substring(0, 2);

  }

  ngOnInit(): void {
      this.uid = localStorage.getItem('uid');
      this.myrole = localStorage.getItem('role');
      this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
        data => {
          console.log(data);
          this.rUser = data.filter( u => {  
            return u.user_status == 1;
    
          });
         
         this.max = +data[0].user_username.substring(0,2)
         this.min = +data[data.length-1].user_username.substring(0,2) 
         for(var i=this.max; i>=this.min; i--){
        
        
            this.rawData.push(i);
          
          
          }
          console.log(this.rawData);
         }, error => {
        });  
  }

  post(){
    
      this.tag=this.nrSelect;
      let json = {webboard_title:this.text, 
        webboard_description:this.text2,
        webboard_date: new Date(),
        webboard_gen:this.tag,
        UID:this.uid}
        console.log(json);
    
      this.http.post('http://qpos.msuproject.net/AllNewService/webboard/addwebboard',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            console.log('ok');
            this.router1.navigateByUrl('/webboard/'+this.user_username);
            }
            else{
              alert('กรอกข้อมูลไม่ครบ');
            }       
         
      }, error =>{
        alert('fail');
      });
      
  }

}
