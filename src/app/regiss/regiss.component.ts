import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-regiss',
  templateUrl: './regiss.component.html',
  styleUrls: ['./regiss.component.css']
})
export class RegissComponent implements OnInit {
  
  firstname; 
  lastname;
  username;
  password;
  phone;
  email;
  facebook;
  year;
  workplace;
  addwork;
  job;
  workphone;
  role;
  status;
  sinImputarValue;

  regisData = {};

  constructor(private _auth: AuthService,private http: HttpClient,private router1: Router) { }

  ngOnInit(): void {
    var years = 2530;
    var till = 2580;
    var options = "";
    for(var y=years; y<=till; y++){
    options += "<option>"+ y +"</option>";
    }
    document.getElementById("year").innerHTML = options;
  }
  regis(){
      
    let json = {user_username : this.username || '', 
      user_password : this.password || '', 
      user_name : this.firstname+' ' +this.lastname|| '',
      user_phone : this.phone || '',
      user_email : this.email || '',
      user_facebook : this.facebook || '',
      user_year : this.year || '',
      user_job : this.job || '',
      user_workname : this.workplace || '',
      user_workaddress : this.addwork || '',
      user_workphone : this.workphone || '',
      user_role : '2' || '',
      user_status : '0' || ''
     }

    console.log(this.regisData);
   /*  this._auth.regisData = this.regisData; */

     this.http.post('http://qpos.msuproject.net/AllNewService/user/register',JSON.stringify(json)).toPromise().then(data => {
      
      if(data == 1){
        console.log('OK');
        alert('OK!!');
      }else{
      
        console.log(data);
      }
        
      },
      (error) => {
        console.log(error);
      });
 
  
}
sinImputarHo(){

  this.router1.navigateByUrl('/regis');
}
sinImputarMes(){
  this.router1.navigateByUrl('/regiss');
}

}
