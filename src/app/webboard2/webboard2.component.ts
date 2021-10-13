import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-webboard2',
  templateUrl: './webboard2.component.html',
  styleUrls: ['./webboard2.component.css']
})
export class Webboard2Component implements OnInit {
  myValue;
  myUser
  myPost;
  allPost;
  user_username;
  user_username2;
  nrSelect;
  norPost;
  postTag;
  mArray:string[] = [];

  constructor(private router: ActivatedRoute,private http: HttpClient, private router1: Router, private _auth: AuthService) {
    this.user_username = router.snapshot.params['user_username'];
    this.user_username2 =  this.user_username.substring(0, 2);
    console.log(this.user_username);
   }

  ngOnInit(): void {
    this.myValue = this._auth.myData;

    this.http.get('http://qpos.msuproject.net/AllNewService/post/webboard').subscribe(
      data => {
        let json = JSON.parse(JSON.stringify(data));
        var i = 0;
      while (i <json.length) {
        
      if(data[i].web_gen == this.user_username2){
          this.mArray[i] = data[i];  
         }
         else{
         }
      i++;
     }
      this.myPost = this.mArray;
      console.log(this.myPost); 
              
             
      }, error => {
      });  
  }

  web(){
    this.router1.navigateByUrl('/webboard/'+this.user_username);
  }

}
