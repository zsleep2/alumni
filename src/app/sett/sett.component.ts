import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sett',
  templateUrl: './sett.component.html',
  styleUrls: ['./sett.component.css']
})
export class SettComponent implements OnInit {

  myValue;
  user_username;
  username;
  name;
  phone;
  email;
  facebook;
  year;
  workname;
  addwork;
  job;
  workphone;
  password;
  workaddress
  rUser;
  editData = {};

  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService,
    private router1: Router) { 
      this.user_username = router.snapshot.params['user_username'];
    }

  ngOnInit(): void {
    this.myValue = this._auth.myData;
    console.log(this.myValue);
    this.username = this.myValue[0].user_username;
    this.password = this.myValue[0].user_password;
    this.name = this.myValue[0].user_name;
    this.phone = this.myValue[0].user_phone;
    this.email = this.myValue[0].user_email;
    this.facebook = this.myValue[0].user_facebook;
  }

  eDit(){
  
    let json = {
     user_username : this.username || '',
    user_password : this.password || '',
    user_name : this.name || '',
    user_phone : this.phone || '',
    user_email : this.email || '',
    user_facebook : this.facebook || '',}
    console.log(json);

    this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,JSON.stringify(json)).toPromise().then(data => {
                
      if(data == 1){
        console.log("ok");
        alert('แก้ไขข้อมูลเรียบร้อย');
        this.router1.navigateByUrl('/sett/'+this.user_username);
      }else{
      
        console.log(data);
      }
        
      },
      (error) => {
        console.log(error);
  });
  }


}
