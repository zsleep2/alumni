import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
// Angular Forms Modules
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder , Validators} from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

interface Articles{
  user_name: any ,
  user_prefix : string,
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
  test:string;
  rUser;
  editData = {};
  public myrole;
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
  uid:any;
  checklist:number;


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
     this.showname = localStorage.getItem('name').split(" ");
     this.uid = localStorage.getItem('uid');
     this.showaddress = localStorage.getItem('address').split(" ");
    }
    this.d = new Date();
    this.myYear = +this.d.getFullYear() +543;
    for(let i = this.myYear; i>this.myYear-20;i--){
        this.sYear.push(i);
    }
    console.log(this.sYear);
    
    this.registerForm = this.formBuilder.group({
      phone: ['',[ Validators.required, Validators.pattern(this.mobnumPattern)]],
      prefix:[''],
      firstName: [''],
      lastName: [''],
      facebook: [''],
      email: ['', [Validators.required, Validators.email]],
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
      workphone: ['',[ Validators.required, Validators.pattern(this.mobnumPattern)]],
     
  }, {
  });
  
  if(this.myrole == "1"){
      console.log("g");
      this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/teacher').subscribe(
        data => {
          //console.log(data);
          this.rUser = data.filter( u => {  
            return u.user_username == this.user_username;
           
          });
          
         }, error => {
        }); 
  }else{
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {
      //console.log(data);
      this.rUser = data.filter( u => {  
      
        return u.user_username == this.user_username;
        
      });
      
     }, error => {
    });
  }

 


  
   //console.log(this.user_username);
       
  }
  
 get f() { return this.registerForm.controls; 
  } 
  

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


    if(this.registerForm.value.phone){
      if(this.registerForm.controls.phone.invalid){
              return;
            } 
    }
    if(this.registerForm.value.email){
      if(this.registerForm.controls.email.invalid){
              return;
            } 
    }
      
       
   
   

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

 

  county = [
    { id:1, name: "กรุงเทพมหานคร"},
    { id:2, name: "สมุทรปราการ"},
    { id:3, name: "นนทบุรี"},
    { id:4, name: "ปทุมธานี"},
    { id:5, name: "พระนครศรีอยุธยา"},
    { id:6, name: "อ่างทอง"},
    { id:7, name: "ลพบุรี"},
    { id:8, name: "สิงห์บุรี"},
    { id:9, name: "ชัยนาท"},
    { id:10, name: "สระบุรี"},
    { id:11, name: "ชลบุรี"},
    { id:12, name: "ระยอง"},
    { id:13, name: "จันทบุรี"},
    { id:14, name: "ตราด"},
    { id:15, name: "ฉะเชิงเทรา"},
    { id:16, name: "ปราจีนบุรี"},
    { id:17, name: "นครนายก"},
    { id:18, name: "สระแก้ว"},
    { id:19, name: "นครราชสีมา"},
    { id:20, name: "บุรีรัมย์"},
    { id:21, name: "สุรินทร์"},
    { id:22, name: "ศรีสะเกษ"},
    { id:23, name: "อุบลราชธานี"},
    { id:24, name: "ยโสธร"},
    { id:25, name: "ชัยภูมิ"},
    { id:26, name: "อำนาจเจริญ"},
    { id:27, name: "หนองบัวลำภู"},
    { id:28, name: "ขอนแก่น"},
    { id:29, name: "อุดรธานี"},
    { id:30, name: "เลย"},
    { id:31, name: "หนองคาย"},
    { id:32, name: "มหาสารคาม"},
    { id:33, name: "ร้อยเอ็ด"},
    { id:34, name: "กาฬสินธุ์"},
    { id:35, name: "สกลนคร"},
    { id:36, name: "นครพนม"},
    { id:37, name: "มุกดาหาร"},
    { id:38, name: "เชียงใหม่"},
    { id:39, name: "ลำพูน"},
    { id:40, name: "ลำปาง"},
    { id:41, name: "อุตรดิตถ์"},
    { id:42, name: "แพร่"},
    { id:43, name: "น่าน"},
    { id:44, name: "พะเยา"},
    { id:45, name: "เชียงราย"},
    { id:46, name: "แม่ฮ่องสอน"},
    { id:47, name: "นครสวรรค์"},
    { id:48, name: "อุทัยธานี"},
    { id:49, name: "กำแพงเพชร"},
    { id:50, name: "ตาก"},
    { id:51, name: "สุโขทัย"},
    { id:52, name: "พิษณุโลก"},
    { id:53, name: "พิจิตร"},
    { id:54, name: "เพชรบูรณ์"},
    { id:55, name: "ราชบุรี"},
    { id:56, name: "กาญจนบุรี"},
    { id:57, name: "สุพรรณบุรี"},
    { id:58, name: "นครปฐม"},
    { id:59, name: "สมุทรสาคร"},
    { id:60, name: "สมุทรสงคราม"},
    { id:61, name: "เพชรบุรี"},
    { id:62, name: "ประจวบคีรีขันธ์"},
    { id:63, name: "นครศรีธรรมราช"},
    { id:64, name: "กระบี่"},
    { id:65, name: "พังงา"},
    { id:66, name: "ภูเก็ต"},
    { id:67, name: "สุราษฎร์ธานี"},
    { id:68, name: "ระนอง"},
    { id:69, name: "ชุมพร"},
    { id:70, name: "สงขลา"},
    { id:71, name: "สตูล"},
    { id:72, name: "ตรัง"},
    { id:73, name: "พัทลุง"},
    { id:74, name: "ปัตตานี"},
    { id:75, name: "ยะลา"},
    { id:76, name: "นราธิวาส"},
    { id:77, name: "บึงกาฬ"}
  ];

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


}
