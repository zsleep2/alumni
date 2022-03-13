import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';


interface Articles{
  user_name: string,
  user_prefix: string,
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
  UID: number;
}


@Component({
  selector: 'app-member1-detail',
  templateUrl: './member1-detail.component.html',
  styleUrls: ['./member1-detail.component.css']
})
export class Member1DetailComponent implements OnInit {
  user_username: string;
  user_username2: string;
  myrole: string;
  items: { label: string; routerLink: string[]; }[];
  userID: number;
  activePage: number;
  uid: number;
  results: Articles[];
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
  test:string;
  rUser;
  editData = {};
  registerForm: FormGroup;
  submitted = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  usernamePattern = "^((\\+91-?)|0)?[0-9]{11}$"; 
  address;
  showname: any;
  showaddress: any;
  public sYear:number[]=[];
  myYear;
  d;
  show:boolean = false;


  public urlSource:string = "http://qpos.msuproject.net/AllNewService/user/result";

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router4: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.user_username = localStorage.getItem('user_username');;
      }


  ngOnInit(): void {
    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
      this.user_username2 = this.user_username.substring(0, 2);
      this.myrole = localStorage.getItem('role');
      this.uid = +localStorage.getItem('uid');
      this.showname = localStorage.getItem('name').split(" ");
      this.showaddress = localStorage.getItem('address').split(" ");
    }
    this.d = new Date();
    this.myYear = +this.d.getFullYear() +543;
    for(let i = this.myYear; i>this.myYear-20;i--){
        this.sYear.push(i);
    }

    this.registerForm = this.formBuilder.group({
      phone: [''],
      prefix:[''],
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


      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: 'สมาชิก', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' อัลบั้ม ', routerLink:['/album/'+this.user_username]
        },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username]
        },
        
  ]
    
    


    let params = this.router.snapshot.paramMap;
    if(params.has('UID')){
      this.userID = +params.get('UID');
    }
    this.router
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
      }
    });  
   
    console.log(this.userID + " = " +this.uid);

    if(this.myrole == '1'){
      this.http.get<Articles[]> ("http://qpos.msuproject.net/AllNewService/user/teacher")
      .subscribe(
        data => {
          // กรณี resuponse success
          this.results = data.filter( res => {
            return res.UID == this.userID;
          });
        },
        ( err:HttpErrorResponse ) => {
          // กรณี error
          if (err.error instanceof Error) {
            // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
            console.log('An error occurred:', err.error.message);
          }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }       
        } ); 
    }else{
      this.http.get<Articles[]>(this.urlSource)
      .subscribe(
        data => {
          // กรณี resuponse success
          this.results = data.filter( res => {
            return res.UID == this.userID;
          });
        },
        ( err:HttpErrorResponse ) => {
          // กรณี error
          if (err.error instanceof Error) {
            // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
            console.log('An error occurred:', err.error.message);
          }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }       
        } ); 
    }

  }

  toggle() {
   
    this.show = !this.show;
   
  }




  get f() { return this.registerForm.controls; } 

  eDit(){
    this.submitted = true;
    console.log(this.results);
    if(this.results){
      this.username = this.results[0].user_username;
      this.password = this.results[0].user_password;
      this.prefix = this.results[0].user_prefix;
      this.name = this.results[0].user_name;
      this.phone = this.results[0].user_phone;
      this.email = this.results[0].user_email;
      this.facebook = this.results[0].user_facebook;
      this.year = this.results[0].user_year;
      this.job = this.results[0].user_job;
      this.workname = this.results[0].user_workname;
      this.workaddress = this.results[0].user_workaddress;
      this.workphone = this.results[0].user_workphone;
      this.best = this.results[0].user_best;
      this.role = this.results[0].user_role;
      this.status = this.results[0].user_status
    }
    console.log(this.registerForm.value);

     // stop here if form is invalid
   /*  if (this.registerForm.invalid) {
        return;
    } */  

    if(this.registerForm.value.prefix){
      this.prefix = this.registerForm.value.prefix
    }

    this.test = this.name.split(" ");
    if(this.registerForm.value.firstName ){
      this.name = this.registerForm.value.firstName + " " + this.test[1];
    }  this.test = this.name.split(" ");
    if(this.registerForm.value.lastName){
      this.name = this.test[0]+" "+ this.registerForm.value.lastName;
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
   
    if(this.registerForm.value.workphone){
      this.workphone = this.registerForm.value.workphone;
    }
    this.address = this.workaddress.split(" ")
    console.log(this.address);
    if(this.registerForm.value.no){
        this.workaddress = "เลขที่ "+this.registerForm.value.no + " หมู่ "+
        this.address[3]+" ถนน "+this.address[5]+" ตำบล "+this.address[7]+" อำเภอ "+
        this.address[9]+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.address[13] 
    } 
    this.address = this.workaddress.split(" ");
    if(this.registerForm.value.swine){
      this.workaddress = "เลขที่ "+this.address[1]+" หมู่ "+this.registerForm.value.swine
      +" ถนน "+this.address[5]+" ตำบล "+this.address[7]+" อำเภอ "+
      this.address[9]+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.address[13] 
     } 
    
     this.address = this.workaddress.split(" ")
     if(this.registerForm.value.road){
      this.workaddress = "เลขที่ "+this.address[1] + " หมู่ "+
      this.address[3]+" ถนน "+this.registerForm.value.road+" ตำบล "+this.address[7]+" อำเภอ "+
      this.address[9]+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.address[13] 
     } 
   
     this.address = this.workaddress.split(" ")
     if(this.registerForm.value.subdistrict){
      this.workaddress = "เลขที่ "+this.address[1] + " หมู่ "+
      this.address[3]+" ถนน "+this.address[5]+" ตำบล "+this.registerForm.value.subdistrict+" อำเภอ "+
      this.address[9]+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.address[13] 
     } 
   
     this.address = this.workaddress.split(" ")
     if(this.registerForm.value.district){
      this.workaddress = "เลขที่ "+this.address[1] + " หมู่ "+
      this.address[3]+" ถนน "+this.address[5]+" ตำบล "+this.address[7]+" อำเภอ "+
      this.registerForm.value.district+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.address[13] 
     } 
     
     this.address = this.workaddress.split(" ")
     if(this.registerForm.value.county){
      this.workaddress = "เลขที่ "+this.address[1] + " หมู่ "+this.address[3]+" ถนน "+
      this.address[5]+" ตำบล "+this.address[7]+" อำเภอ "+this.address[9]+" จังหวัด "+
      this.registerForm.value.county+" รหัสไปรษณี "+this.address[13] 
     } 
    
     this.address = this.workaddress.split(" ")
     if(this.registerForm.value.zipcode){
      this.workaddress = "เลขที่ "+this.address[1] + " หมู่ "+
      this.address[3]+" ถนน "+this.address[5]+" ตำบล "+this.address[7]+" อำเภอ "+
      this.address[9]+" จังหวัด "+this.address[11]+" รหัสไปรษณี "+this.registerForm.value.zipcode
     }
     console.log(this.workaddress);
     console.log(this.address);
  
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
    if(window.confirm('คุณต้องการเปลี่ยนข้อมูลส่วนตัว ? ')){
      this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.user_username,
      JSON.stringify(json)).toPromise().then(data => {
                if(data == 1){
                  console.log("ok");
                  localStorage.setItem('name',this.name);
                  localStorage.setItem('address',this.workaddress);
                  alert('แก้ไขข้อมูลเรียบร้อย');
                  this.submitted = false;
                  this.registerForm.reset();
                  window.location.reload();
                }else{
                
                  console.log(data);
                }
                  
                },
                (error) => {
                  console.log(error);
            });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  logOut(){
    this.router1.navigateByUrl('/home');
    localStorage.removeItem('status');
    localStorage.removeItem('user_username');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    localStorage.removeItem('password');
  
  }

}
