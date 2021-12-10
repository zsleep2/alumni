import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// Angular Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

interface Articles{
  'user_username':string,
  'user_name':string,
  'user_email':string,
  'user_phone':string,
  'user_facebook':string,
  'user_status':number
}


@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {
  firstname;
  username;
  password;
  lastname;
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
  rUser;
  checkUser:number;

  regisData = [];

 /*  item = [{user_username:58011212283,
           user_password:123456},
  
          {
            user_username:58011212282,
            user_password:123456
          }

]; */

  constructor( private _auth: AuthService,private http: HttpClient,private router1: Router) { }

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

  regis(){

    this.checkUser = 0;

     for (var i in this.rUser) {  
        if(this.username == this.rUser[i].user_username){
           this.checkUser = 1;
           break;
        }
      }
    
      if(this.checkUser ==1){
          alert('เป็นสมาชิกแล้ว');
      }else{
        if(window.confirm('ยืนยัน ?')){
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

              this.http.post('http://qpos.msuproject.net/AllNewService/user/register',JSON.stringify(json)).toPromise().then(data => {
                  if(data == 1){
                    console.log('OK');
                    alert('สมัครสมาชิกเรียบร้อย');
                    this.router1.navigateByUrl('/login');
                  }else{
                    alert('err');
                    console.log(data);
                  }
                    
                  },
                  (error) => {
                    console.log(error);
                  }); 
        }
          
       
      } 
  }

  test(){
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
    console.log(json);
  }
  sinImputarHo(){
    
    this.router1.navigateByUrl('/regis');
  }
  sinImputarMes(){
    this.router1.navigateByUrl('/regiss');
  }
  

}
