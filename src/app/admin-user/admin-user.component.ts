import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Articles{
  user_username:string;
  user_password:string;
  user_prefix:string;
  user_user_name:string;
  user_phone:string;
  user_email:string;
  user_facebook:string;
  user_year:string;
  user_workplace:string;
  user_addwork:string;
  user_job:string;
  user_workphone:string;
  user_role:number;
  user_status:number;
}


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  myValue;

  data:any;
  data1: any;
  user_username;
  rUser;
  userID;
  deuserID;
  username;
  password;
  name;
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
  nrSelect:number;
  results
  sName:any;
  min:number;
  max:number;
  rawData = [];

  public iPage:number[] = [];
  public iPageStart:number = 1;
  public prevPage:number;
  public nextPage:number;
  public activePage:number;
  public totalItem:number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage:number = 10; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage:number;
  public maxShowPage:number;
  public useShowPage:number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public show:boolean = false;
  mygen: any;
  prefix: any;
  best: any;
  workname: any;
  workaddress: any;
  config: { itemsPerPage: number; currentPage: number; };
 public checkuser:boolean =false;

  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      this.user_username = localStorage.getItem('user_username');
      this.config = {
        itemsPerPage: 10,
        currentPage: 1
      };
    }

    
  

  ngOnInit(): void {
    this.nrSelect = 0;
    this.mygen = "0";
    const status = localStorage.getItem('status');
     if(status !== '1'){
        this.router1.navigateByUrl('/login');
     }else{
     
     }


    
    
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/checkname').subscribe(
      data => {
        console.log(data);
        this.rUser = data;
        this.results = data.filter( user => {
          
          return user.user_status == 0;
        });

       }, error => {
      }); 

      this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
             data => {
               console.log(data);
             
              
              this.max = +data[0].user_username.substring(0,2)
              this.min = +data[data.length-1].user_username.substring(0,2) 
              for(var i=this.max+1; i>=this.min; i--){
               if(i ==this.max+1){
                 this.rawData.push('');
               }else{
                 this.rawData.push(i);
               }
               
               }
               console.log(this.rawData);
              }, error => {
             });  
     
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
  
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;

    if (target.files.length !== 1) throw new Error('cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
       const bstr: string = e.target.result;
       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
       const wsname: string = wb.SheetNames[0];
       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        console.log(ws);
        /* this.data:Articles[] = XLSX.utils.sheet_to_json<Articles>(ws); */
     /*    const row : Articles[] = XLSX.utils.sheet_to_json<Articles>(ws); */
       this.data = XLSX.utils.sheet_to_json<Articles>(ws);

     
       /*    this.data1 = JSON.stringify(this.data);
          console.log(this.data1); */
          
       /*  this.data1 = (XLSX.utils.sheet_to_json(ws , {header : 2})); */
   /*   console.log(this.data);
     console.log(this.data1); */
       //console.log(this.data[0]);
     //console.log(this.data[0].user_username);
    /*   this.inputData(); */
    };
    reader.readAsBinaryString(target.files[0]);
   }

   inputData() {
     console.log(this.data);
     console.log(this.rUser);
    for (var i in this.data) {
      for(var j in this.rUser){ 
        if(this.data[i].user_username == this.rUser[j].user_username){
            console.log('ซ้ำ'+this.data[i].user_username);
            this.check();
            break;
          } 
        } 
        console.log(this.checkuser);
        if(this.checkuser == true){
          alert(this.data[i].user_username+' ซ้ำในระบบไม่สามารถสมัครได้');
          this.check();
        }else{
          let json ={
            user_username : this.data[i].user_username || '',       
            user_password : this.data[i].user_password || '',
            user_prefix : this.data[i].user_prefix || '',
            user_name : this.data[i].user_name || '',
            user_email : this.data[i].user_email || '',
            user_phone : this.data[i].user_phone || '',
            user_facebook : this.data[i].user_facebook || '',
            user_year : this.data[i].user_year || '',
            user_workname : this.data[i].user_workname || '',
            user_workaddress : this.data[i].user_workaddress || '',
            user_job : this.data[i].user_job || '',
            user_workphone : this.data[i].user_workphone || '',
            user_role : this.data[i].user_role || '',
            user_best : 0 ,
            user_status : 0
          } 
          console.log(json);
          
          this.http.post('http://qpos.msuproject.net/AllNewService/user/register',JSON.stringify(json)).toPromise().then(data => {
            if(data == 1){
              document.getElementById("myForm").style.display = "none";
             this.rawData=[];
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
     
}
    check(){
        this.checkuser = !this.checkuser;
    }

      toggle() {
       
        this.show = !this.show;
        this.nrSelect = 0;
      }

      getId(value : string){
        this.userID = value;
      }

      checkUser(value : string){
        this.userID = value;
        for(let i = 0 ; i < this.rUser.length ; i++){
            if(this.userID == this.rUser[i].user_username){

                this.username = this.rUser[i].user_username;
                this.password = this.rUser[i].user_password;
                this.prefix = this.rUser[i].user_prefix;
                this.name = this.rUser[i].user_name;
                this.email = this.rUser[i].user_email;
                this.phone = this.rUser[i].user_phone;
                this.facebook = this.rUser[i].user_facebook;
                this.year = this.rUser[i].user_year;
                this.job = this.rUser[i].user_job;
                this.workname = this.rUser[i].user_workname;
                this.workaddress = this.rUser[i].user_workaddress;
                this.workphone = this.rUser[i].user_workphone;
                this.best = this.rUser[i].user_best;
                this.role = this.rUser[i].user_role;

                console.log(this.rUser[i].user_status);

                if(this.rUser[i].user_status == 0){
                      let json = {user_username : this.username || '', 
                      user_password : this.password || '', 
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
                      user_best : this.best || '',
                      user_role : this.role || '',
                      user_status : 1
                    }
                    console.log(json,this.username);
                    if(window.confirm('คุณต้องการเปิดสถานะของ '+this.name+' ?')){
                        this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'
                        +this.username,JSON.stringify(json)).toPromise().then(data => {
                      if(data == 1){
                        alert('เปิดสถานะของ '+this.name+' เรียบร้อย' );
                        this.rawData=[];
                        window.location.reload();
                      }else{
                      
                        console.log(data);
                      }   
                      },
                      (error) => {
                        console.log(error);
                      });
                  }
                }else{
                   let json = {user_username : this.username || '', 
                    user_password : this.password || '', 
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
                    user_best : this.best || '',
                    user_role : this.role || '',
                    user_status : 0
                  }
                  console.log(json,this.username);
                  if(window.confirm('คุณต้องการปิดสถานะของ '+this.name+' ?')){
                      this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.username,JSON.stringify(json)).toPromise().then(data => {
                    if(data == 1){
                      alert('ปิดสถานะของ '+this.name+' เรียบร้อย' );
                      this.rawData=[];
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

                   

                  

        }    
    }
  }

      deleteUser(value : string){
          this.deuserID = value;
          console.log(this.deuserID);
          let json = {
          user_username : this.deuserID
        }
        if(window.confirm('ต้องการลบสมาขิก ' + this.deuserID +" ?")){
            this.http.post('http://qpos.msuproject.net/AllNewService/user/delete',JSON.stringify(json)).toPromise().then(data => {
         if(data == 1){
          
         }else{
          alert('ลบสมาชิกเรียบร้อย');
          this.rawData=[];
          window.location.reload();
           console.log(data);
         }   
         },
         (error) => {
           console.log(error);
         });
     }
      }
      
      checkallUser(){
        if(window.confirm('ต้องการเพิ่มสมาชิก ?')){
          for(let i in this.results){
            let json = {user_username : this.results[i].user_username || '', 
            user_password : this.results[i].user_password || '', 
            user_prefix : this.results[i].user_prefix || '',
            user_name : this.results[i].user_name || '',
            user_phone :  this.results[i].user_phone || '',
            user_email : this.results[i].user_email || '',
            user_facebook : this.results[i].user_facebook || '',
            user_year : this.results[i].user_year || '',
            user_job :this.results[i].user_job || '',
            user_workname : this.results[i].user_workname|| '',
            user_workaddress : this.results[i].user_workaddress || '',
            user_workphone : this.results[i].user_workphone || '',
            user_best : this.results[i].user_best || '',
            user_role : this.results[i].user_role || '',
            user_status : 1
          }
            console.log(json);
          
            this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.results[i].user_username,
            JSON.stringify(json)).toPromise().then(data => {
                if(data == 1){
                  this.nrSelect = 0;
                  this.show = true;
                  this.rawData=[];
                  window.location.reload();
                  console.log('ok');
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
    
      searchYear(){
        this.mygen = this.year;
          this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
            data => {
             
              this.rUser = data.filter( user => {
                return user.user_username.substring(0,2) == this.year;
              });
             }, error => {
            }); 
           
      }
      
      showTeacher(){
        this.year = '';
        this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/teacher').subscribe(
          data => {  
            this.rUser = data;
           }, error => {
          }); 
      }

      clearUser(){
        this.year = '';
        if(this.nrSelect == 0){
          this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/checkname').subscribe(
          data => {  
            this.rUser = data;
           }, error => {
          })
        }
        if(this.nrSelect ==1 ){
          this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/checkname').subscribe(
            data => {
             
              this.rUser = data.filter( user => {
                return user.user_status == 0;
              });
             }, error => {
            }); 
        }
        if(this.nrSelect == 2 ){
          this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/teacher').subscribe(
            data => {
             
              this.rUser = data.filter( user => {
                return user.user_status == 0;
              });
             }, error => {
            }); 
        }
    }
      SearchName(){
        console.log(this.rUser);
        if(this.sName == ""){
          this.rawData =[];
            this.ngOnInit();
           
        }else{
          this.rUser = this.rUser.filter(res =>{
            return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
          })
        }
    }

openForm() {
  document.getElementById("myForm").style.display = "block";
}

closeForm() {
  document.getElementById("myForm").style.display = "none";
}
}
