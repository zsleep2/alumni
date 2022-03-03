import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
// Angular Forms Modules
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';

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
//old data
  username; 
  password;
  prefix;
  name;
  phone;
  email;
  facebook;
  year;
  workname;
  addwork;
  job;
  workphone;
  workaddress;
  best;
  role;
  status;

  rUser;
  editData = {};
  public myrole;
  registerForm: FormGroup;
  submitted = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  usernamePattern = "^((\\+91-?)|0)?[0-9]{11}$"; 


  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService,
    private router1: Router,
    private formBuilder: FormBuilder) {

      this.user_username = localStorage.getItem('user_username');
     }

  ngOnInit(): void {

    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
     this.myrole = localStorage.getItem('role');
    }
    console.log(this.myrole);
    this.registerForm = this.formBuilder.group({
      phone: [''],
      firstName: [''],
      lastName: [''],
      facebook: [''],
      email: ['', [Validators.email]],
      role : [''],
      year : [''],
      workname : [''],
      job : [''],
      no : [''],
      swine : [''],
      road : [''],
      subdistrict : [''],
      district : [''],
      county : [''],
      zipcode : [''],
      workphone : [''],
     
  }, {
  });
  
  if(this.myrole == "1"){
      console.log("g");
      this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/teacher').subscribe(
        data => {
          console.log(data);
          this.rUser = data.filter( u => {  
            return u.user_username == this.user_username;
           
          });
          
         }, error => {
        }); 
  }else{
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {
      console.log(data);
      this.rUser = data.filter( u => {  
        return u.user_username == this.user_username;
       
      });
      
     }, error => {
    }); 
  }


  
   console.log(this.user_username);
       
  }
  
 get f() { return this.registerForm.controls; } 

  eDit(){
    this.submitted = true;
    console.log(this.rUser);
    if(this.rUser){
      this.username = this.rUser[0].user_username;
      this.password = this.rUser[0].user_password;
      this.prefix = this.rUser[0].user_prefix;
      this.name = this.rUser[0].user_name
      this.phone = this.rUser[0].user_phone;
      this.email = this.rUser[0].user_email;
      this.facebook = this.rUser[0].user_facebook;
      this.year = this.rUser[0].user_year;
      this.job = this.rUser[0].user_job;
      this.workname = this.rUser[0].user_workname;
      this.workaddress = this.rUser[0].user_workaddress;
      this.workphone = this.rUser[0].user_workphone;
      this.best = this.rUser[0].user_best;
      this.role = this.rUser[0].user_role;
      this.status = this.rUser[0].user_status
    }
    console.log(this.registerForm.value);

     // stop here if form is invalid
   /*  if (this.registerForm.invalid) {
        return;
    } */
    if(this.registerForm.value.firstName && this.registerForm.value.lastName ){
      this.name = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;
    }
    if(this.registerForm.value.phone){
      this.phone = this.registerForm.value.phone;
    }
    if(this.registerForm.value.email){
      this.email = this.registerForm.value.email;
    }
    if(this.registerForm.value.facebook){
      this.facebook = this.registerForm.value.facebook;
      
    }
     if(this.registerForm.value.role){
      this.role = this.registerForm.value.role;
    }
    if(this.registerForm.value.year){
      this.year = this.registerForm.value.year;
    }
    if(this.registerForm.value.workname){
      this.workname = this.registerForm.value.workname;
    }
    if(this.registerForm.value.job){
      this.job = this.registerForm.value.job;
    }
   /*  if(this.registerForm.value.workaddress){
      this.workaddress = this.registerForm.value.workaddress;
    } */
    if(this.registerForm.value.workphone){
      this.workphone = this.registerForm.value.workphone;
    }
    this.workaddress = "บ้านเลขที่ "+this.registerForm.value.no+" "+
    "หมู่ "+this.registerForm.value.swine+" "+
    "ถนน "+this.registerForm.value.road+" "+
    "ตำบล"+this.registerForm.value.subdistrict+" "+
    "อำเภอ"+this.registerForm.value.district+" "+
    "จังหวัด"+this.registerForm.value.county+" "+
    "รหัสไปรษณี "+this.registerForm.value.zipcode
   
    let json = {
    user_username : this.user_username,
    user_password : this.password,
    user_prefix : this.prefix || '',
    user_name : this.name || '',
    user_phone : this.phone || '',
    user_email : this.email || '',
    user_facebook : this.facebook || '',
    user_year : this.year || '',
    user_job : this.job || '',
    user_workname : this.workname || '',
    user_workaddress : this.workaddress || '',
    user_workphone : this.workphone || '',
    user_best : this.best ,
    user_status : this.status ,
    user_role : this.role 
  }
    console.log(json);
   /*  if(window.confirm('คุณต้องการเปลี่ยนข้อมูลส่วนตัว ? ')){
      this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,
      JSON.stringify(json)).toPromise().then(data => {
                if(data == 1){
                  console.log("ok");
                  alert('แก้ไขข้อมูลเรียบร้อย');
                  this.submitted = false;
                  this.registerForm.reset();
                 this.ngOnInit();
                }else{
                
                  console.log(data);
                }
                  
                },
                (error) => {
                  console.log(error);
            });
    } */
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


}
