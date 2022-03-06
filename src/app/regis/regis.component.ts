import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';



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
  registerForm: FormGroup;
  submitted = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  usernamePattern = "^((\\+91-?)|0)?[0-9]{11}$"; 
  hide;
  regisData = [];


  constructor( private _auth: AuthService,private http: HttpClient,private router1: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.hide = 0;

    if(this.hide = 0){
     this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['',[ Validators.required, Validators.pattern(this.mobnumPattern)]],
      facebook: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role : ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      }, {
      });
    }else{
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['',[ Validators.required, Validators.pattern(this.mobnumPattern)]],
        facebook: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role : ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        }, {
        });
      
    }

   

    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        console.log(data);
        this.rUser = data.filter( u => {  
          return u.user_status == 1;

        });
       }, error => {
      }); 
    
    
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    /* console.log(this.registerForm.value); */
     // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.checkUser = 0;

     for (var i in this.rUser) {  
        if(this.registerForm.value.username == this.rUser[i].user_username){
           this.checkUser = 1;
           break;
        }
      }

    if(this.checkUser ==1){
        alert('เป็นสมาชิกแล้ว');
    }else{
      if(window.confirm('ยืนยัน ?')){
          if(this.hide == 0){
            let json = {user_username : this.registerForm.value.username || '', 
            user_password : this.registerForm.value.password || '',
            user_prefix : this.registerForm.value.title ||'',
            user_name :this.registerForm.value.firstName +' '+ this.registerForm.value.lastName || '',
            user_phone : this.registerForm.value.phone || '',
            user_email : this.registerForm.value.email || '',
            user_facebook : this.registerForm.value.facebook || '',
            user_year : this.registerForm.value.year || '',
            user_job :this.registerForm.value.job || '',
            user_workname : this.registerForm.value.workname  || '',
            user_workaddress : this.registerForm.value.workaddress || '',
            user_workphone :this.registerForm.value.workphone || '',
            user_best : '0',
            user_role : this.registerForm.value.role || '',
            user_status : 0
        } }else{
              let json = {user_username : this.registerForm.value.username || '', 
              user_password : this.registerForm.value.password || '',
              user_prefix : this.registerForm.value.title ||'',
              user_name :this.registerForm.value.firstName +' '+ this.registerForm.value.lastName || '',
              user_phone : this.registerForm.value.phone || '',
              user_email : this.registerForm.value.email || '',
              user_facebook : this.registerForm.value.facebook || '',
              user_year : this.registerForm.value.year || '',
              user_job :this.registerForm.value.job || '',
              user_workname : this.registerForm.value.workname  || '',
              user_workaddress : this.registerForm.value.workaddress || '',
              user_workphone :this.registerForm.value.workphone || '',
              user_best : '0',
              user_role : this.registerForm.value.role || '',
              user_status : 0
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
   
    
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

 
  sinImputarHo(){
    
    this.router1.navigateByUrl('/regis');
  }
  sinImputarMes(){
    this.router1.navigateByUrl('/regiss');
  }

  nisit(){
    this.hide = 0;
      console.log('0');
  }
  teacher(){
    this.hide = 1;
      console.log('1');
  }
  

}
