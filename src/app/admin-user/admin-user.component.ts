import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  data: [][];
  data1: [][];
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

  public show:boolean = false;
  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      this.user_username = router.snapshot.params['user_username'];
    }

  ngOnInit(): void {
    this.http.get('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        console.log(data);
        this.rUser = data;
       }, error => {
      }); 
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
        //console.log(ws);
        this.data = XLSX.utils.sheet_to_json(ws);
        /* this.data1 = (XLSX.utils.sheet_to_json(ws , {header : 1})); */
     /* console.log(this.data); */
     //console.log(this.data1);
       //console.log(this.data[0]);
     //console.log(this.data[0].user_username);
    /*   this.inputData(); */
    };
    reader.readAsBinaryString(target.files[0]);
   }

   inputData() {
    for (var i in this.data) {
    //console.log(this.data[i]);
    /*  let json ={
                user_username : this.data[i].user_username || '',       
                user_password : this.data[i].user_password || '',
                user_name : this.data[i].user_name || '',
                user_email : this.data[i].user_email || '',
                user_phone : this.data[i].user_phone || '',
                user_facebook : this.data[i].user_facebook || '',
                user_year : this.data[i].user_year || '',
                user_workname : this.data[i].user_workname || '',
                user_workaddress : this.data[i].user_addwork || '',
                user_job : this.data[i].user_job || '',
                user_workphone : this.data[i].user_workphone || '',
                user_role : this.data[i].user_role || '',
                user_status : 1
              }
     console.log(json) 
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
        });  */
          }   
      } 

      toggle() {
       
        this.show = !this.show;
      }

      checkUser(value : string){
        this.userID = value;
        for(let i = 0 ; i < this.rUser.length ; i++){
            if(this.userID == this.rUser[i].user_username){

                this.username = this.rUser[i].user_username;
                this.password = this.rUser[i].user_password;
                this.name = this.rUser[i].user_name;
                this.email = this.rUser[i].user_email;
                this.phone = this.rUser[i].user_phone;
                this.facebook = this.rUser[i].user_facebook;
                this.year = this.rUser[i].user_year;
                this.workplace = this.rUser[i].user_workplace;
                this.addwork = this.rUser[i].user_workplace;
                this.job = this.rUser[i].user_job;
                this.workphone = this.rUser[i].user_workplace;
                this.role = this.rUser[i].user_role;
               

                let json = {user_username : this.username || '', 
                user_password : this.password || '', 
                user_name : this.name || '',
                user_phone : this.phone || '',
                user_email : this.email || '',
                user_facebook : this.facebook || '',
                user_year : this.year || '',
                user_job : this.job || '',
                user_workname : this.workplace || '',
                user_workaddress : this.addwork || '',
                user_workphone : this.workphone || '',
                user_status : 1
               }
               console.log(json,this.username);

               if(window.confirm('ต้องการเพิ่มสมาชิก ?')){
                   this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.username,JSON.stringify(json)).toPromise().then(data => {
                if(data == 1){
                  alert('เพิ่มสมาชิกเรียบร้อย');
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
      }

      deleteUser(value : string){
          this.deuserID = value;
          let json = {
          user_username : this.deuserID
        }
        if(window.confirm('ต้องการลบสมาชิก ?')){
            this.http.post('http://qpos.msuproject.net/AllNewService/user/delete',JSON.stringify(json)).toPromise().then(data => {
         if(data == 1){
          
         }else{
          alert('ลบสมาชิกเรียบร้อย');
           this.ngOnInit();
           console.log(data);
         }   
         },
         (error) => {
           console.log(error);
         });
     }
      }

openForm() {
  document.getElementById("myForm").style.display = "block";
}

closeForm() {
  document.getElementById("myForm").style.display = "none";
}
}
