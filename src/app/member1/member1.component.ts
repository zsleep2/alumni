import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface Articles{
  'user_username':string,
  'user_name':string,
  'user_email':string,
  'user_phone':string,
  'user_facebook':string,
  'user_status':number
}



@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component implements OnInit {
 
  text: string;
  text2: string;
  myValue;
  myPost;
  allUser ;
  user_username;
  user_username2
  spit;
  rUser;
  mArray:string[] = [];
 
  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService ,
    private router1: Router) { 
    /*   this.user_username = router.snapshot.params['user_username'];
    this.user_username2 =  this.user_username.substring(0, 2); */
     
    }
  ngOnInit(): void {
    
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
              data => {
                console.log(data);
                this.rUser = data.filter( u => {  
                  return u.user_status == 1;
        
                });
               }, error => {
              }); 
  }

ser(){

  this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {
      
      this.rUser = data.filter( ruser => {
          
        return ruser.user_username.substring(0,2) == this.text2;

      });;
    }, error => {

      alert('No data!');
    }); 
}
cl(){

       this.http.get('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        this.rUser = data;
       }, error => {
      }); 
  }
}

  



