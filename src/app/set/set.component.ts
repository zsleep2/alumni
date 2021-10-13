import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

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
  user_workphone : string
}


@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
a = 0;
b = 1;
  myValue;
  user_username;
  newpassword;
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
  public myrole;

  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService,
    private router1: Router) {

      this.user_username = router.snapshot.params['user_username'];
     }

  ngOnInit(): void {
    this.myValue = this._auth.myData;
    this.myrole = this.myValue[0].user_role;

    console.log(this.myrole);
    this.password = this.myValue[0].user_password;
    this.phone = this.myValue[0].user_phone;
    this.email = this.myValue[0].user_email;
    this.facebook = this.myValue[0].user_facebook;
    this.year = this.myValue[0].user_year;
    this.job = this.myValue[0].user_job;
    this.workname = this.myValue[0].user_workname;
    this.workaddress = this.myValue[0].user_workaddress;
    this.workphone = this.myValue[0].user_workphone;

    var years = 2520;
    var till = 2580;
    var options = "";
    for(var y=years; y<=till; y++){
    options += "<option>"+ y +"</option>";
    }
    document.getElementById("year").innerHTML = options;  
       
  }

  eDit(){
  
    let json = {
    user_username : this.user_username,
    user_password : this.password || '',
    user_name : this.myValue[0].user_name,
    user_phone : this.phone || '',
    user_email : this.email || '',
    user_facebook : this.facebook || '',
    user_year : this.year || '',
    user_job : this.job || '',
    user_workname : this.workname || '',
    user_workaddress : this.workaddress || '',
    user_workphone : this.workphone || '',
    user_status : 1
  }
    console.log(json);

    if(this.year == ''){
       if(this.job != '' ||this.workname != '' || this.workaddress != '' || this.workphone != ''){
          alert('กรุณากรอกปีที่จบ');
       }else{
        this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,JSON.stringify(json)).toPromise().then(data => {
                
          if(data == 1){
            console.log("ok");
            alert('แก้ไขข้อมูลเรียบร้อย');
            this.router1.navigateByUrl('/set/'+this.user_username);
          }else{
          
            console.log(data);
          }
            
          },
          (error) => {
            console.log(error);
      });
       }
    }else{
      this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,JSON.stringify(json)).toPromise().then(data => {
                
                if(data == 1){
                  console.log("ok");
                  alert('แก้ไขข้อมูลเรียบร้อย');
                  this.router1.navigateByUrl('/set/'+this.user_username);
                }else{
                
                  console.log(data);
                }
                  
                },
                (error) => {
                  console.log(error);
            });
  
    }
          
    
  }


}
