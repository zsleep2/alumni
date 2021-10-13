import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_username;
  user_password;
  posts: any;
  myStatus;
  constructor(private http: HttpClient, private router: Router, private _auth: AuthService) { }

  ngOnInit(): void {

  }

  login(){
  
     let json = {user_username:this.user_username , user_password:this.user_password}
    /*  console.log(json); */
     this.http.post('http://qpos.msuproject.net/AllNewService/user/login',JSON.stringify(json)).toPromise().then
     (data =>{

        let json = JSON.parse(JSON.stringify(data));
        if(json.length == 1){
         /*  console.log(data); */
          console.log('Login ok');
          this._auth.myData = json;
          this.myStatus = this._auth.myData[0].user_status;
            console.log(this.myStatus);

          /* this.http.get('http://qpos.msuproject.net/AllNewService/post/webboard').subscribe(
            data1 => {
              let json1 = JSON.parse(JSON.stringify(data1));
                this._auth.myPost = json1;
            }, error => {
            });  */

            if(this.myStatus == 1){
                this.router.navigateByUrl('/home2/'+this.user_username);
            }else{
                alert('รอรับการอนุมัติจากระบบ');
            }
              
            
         
        }else{
          console.log('no data');
        }
    }, error =>{
      console.log('Fail');
    });
  }
}
