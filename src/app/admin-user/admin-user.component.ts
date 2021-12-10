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
  nrSelect:number;
  results
  sName:any;

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

  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      this.user_username = router.snapshot.params['user_username'];
    }

    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/admin_user/'+this.myValue[0].user_username], {queryParams:{page:page}});
    }
    pagination(){
      if(this.activePage > this.useShowPage){
        if(this.activePage+2 <= this.totalPage){
          this.iPageStart = this.activePage-2;
          this.maxShowPage = this.activePage+2;
        }else{
          if(this.activePage <= this.totalPage){
            this.iPageStart = (this.totalPage+1)-this.useShowPage;
            this.maxShowPage = (this.iPageStart-1)+this.useShowPage;
          }
        }
        this.iPage = [];
        for(let i=this.iPageStart;i<=this.maxShowPage;i++){
          this.iPage.push(i);
        }            
      }else{
        this.iPageStart = 1;
        this.iPage = [];
        for(let i=this.iPageStart;i<=this.useShowPage;i++){
          this.iPage.push(i);
        }              
      }   
       
    }
  

  ngOnInit(): void {
    this.nrSelect = 0;
    this.myValue = this._auth.myData;
    var years = 70;
    var till = 50;
    var options = "";
    for(var y=years; y>=till; y--){
    options += "<option>"+ y +"</option>";
    }
    document.getElementById("year").innerHTML = options;


    this.activePage = 1;
    this.nextPage = 2;
    this.pointEnd = this.perPage*this.activePage;
    this.totalPage = Math.ceil(this.totalItem/this.perPage);
    if(this.totalPage>this.useShowPage){
      this.useShowPage = 5;
    }else{
      this.useShowPage = this.totalPage;
    }
  
    for(let i=this.iPageStart;i<=this.useShowPage;i++){
      this.iPage.push(i);
    }
  
    this.router
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
        this.prevPage = this.activePage-1;
        this.nextPage = this.activePage+1;   
        this.pointStart = (this.activePage-1)*this.perPage;
        this.pointEnd = this.perPage*this.activePage;
        this.pagination();
      }   
    });  
    
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        console.log(data);
        this.rUser = data;
        this.results = data.filter( user => {
          
          return user.user_status == 0;
        });
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
        this.nrSelect = 0;
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
                  window.location.reload()
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
          console.log(this.deuserID);
          let json = {
          user_username : this.deuserID
        }
        if(window.confirm('ต้องการลบสมาชิก ?')){
            this.http.post('http://qpos.msuproject.net/AllNewService/user/delete',JSON.stringify(json)).toPromise().then(data => {
         if(data == 1){
          
         }else{
          alert('ลบสมาชิกเรียบร้อย');
          window.location.reload()
           console.log(data);
         }   
         },
         (error) => {
           console.log(error);
         });
     }
      }
      
      checkallUser(){
      
          for(let i in this.results){
            let json = {user_username : this.results[i].user_username || '', 
            user_password : this.results[i].user_password || '', 
            user_name : this.results[i].user_name || '',
            user_phone :  this.results[i].user_phone || '',
            user_email : this.results[i].user_email || '',
            user_facebook : this.results[i].user_facebook || '',
            user_year : this.results[i].user_year || '',
            user_job :this.results[i].user_job || '',
            user_workname : this.results[i].user_workname|| '',
            user_workaddress : this.results[i].user_workaddress || '',
            user_workphone : this.results[i].user_workphone || '',
            user_status : 1
          }
            console.log(json);
            if(window.confirm('ต้องการเพิ่มสมาชิก ?')){
            this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.results[i].user_username,
            JSON.stringify(json)).toPromise().then(data => {
                if(data == 1){
                  this.nrSelect = 0;
                  this.show = true;
                  window.location.reload()
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
          this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
            data => {
             
              this.rUser = data.filter( user => {
                return user.user_username.substring(0,2) == this.year;
              });
             }, error => {
            }); 
           
      }

      clearUser(){
        this.year = '';
        this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
          data => {  
            this.rUser = data;
           }, error => {
          }); 
      }
      SearchName(){
        console.log(this.rUser);
        if(this.sName == ""){
           /*  this.ngOnInit(); */
           
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
