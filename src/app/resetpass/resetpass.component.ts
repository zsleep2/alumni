import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';
import { tr } from 'date-fns/locale';

interface Articles{
  'user_username':string,
  'user_name':string,
  'user_email':string,
  'user_phone':string,
  'user_facebook':string,
  'user_status':number
}

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

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
  user_username;
  myForm: FormGroup;
  isPasswordSame: boolean;
  myrole:any;
  isCurrentPass:boolean;
  oPassword;
  prefix: any;
  name: any;
  workname: any;
  workaddress: any;
  best: any;

  constructor(private _auth: AuthService,private http: HttpClient,private router1: Router,
    private formBuilder: FormBuilder) { 
      this.user_username = localStorage.getItem("user_username");
      this.myForm= this.formBuilder.group({
        currentpassword    : ['', Validators.compose([Validators.required])],
        password    : ['', Validators.compose([Validators.required])],
        confirmPassword    : ['',  Validators.compose([Validators.required])],
      },
      {validator: this.checkPassword('password', 'confirmPassword') }
      );
    }

  ngOnInit(): void {
    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
      this.myrole = localStorage.getItem('role');
      this.oPassword = localStorage.getItem('password');
    }
   
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

  
  }
  checkPassword(controlName: string, matchingControlName: string) {
   
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false;
        } else {
            matchingControl.setErrors(null);
            this.isPasswordSame = (matchingControl.status == 'VALID') ? true : false;
        }
    }
  }
  updatePassword(){
    if(this.myForm.value.currentpassword !== this.oPassword){
        this.isCurrentPass = false;
       
    }else{
      this.isCurrentPass = true;
      if(this.isPasswordSame == false){
      }
      if(this.isPasswordSame == true){
        console.log(this.myForm.value);
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
       
        if(this.myForm.value.password && this.myForm.value.confirmPassword){
            this.password = this.myForm.value.password;
        }
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
        this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,
        JSON.stringify(json)).toPromise().then(data => {
                  if(data == 1){
                    console.log("ok");
                    alert('เปลี่ยนรหัสผ่านเรียบร้อย');
                    this.isCurrentPass = null;
                    this.isPasswordSame = null;
                    this.myForm.reset();
                    localStorage.setItem('password',this.password);
                   this.ngOnInit();
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

  onReset() {
    this.isPasswordSame = null;
    this.isCurrentPass = null;
    this.myForm.reset();
  }
  

}
