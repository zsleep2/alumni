import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

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
  user_best: number;
}

@Component({
  selector: 'app-admin-best',
  templateUrl: './admin-best.component.html',
  styleUrls: ['./admin-best.component.css']
})
export class AdminBestComponent implements OnInit {
  user_username;

  rUser;
  userID;
  deuserID;
  username;
  password;
  prefix;
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
  
  
  public yearBest;
  public achievement1;
  public achievement;
  bestStudent;
  mygen;
  rawData = [];
  myrole;
  public min;
  public max;
  public bestID;
  public show:boolean = false;

  selectedSkill: any
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
  public best: FormGroup;
  yearBest1: any;
  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      this.user_username = localStorage.getItem('user_username');
    }

    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/admin_user/'+this.user_username], {queryParams:{page:page}});
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
    this.yearBest ="";
    this.achievement = "" ;
    
    const status = localStorage.getItem('status');
     if(status !== '1'){
        this.router1.navigateByUrl('/login');
     }else{
        this.myrole = localStorage.getItem('role');
     }

    
    this.mygen="0";
    
    


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
          
          return user.user_best == 1;
        });
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
      
    this.http.get('http://qpos.msuproject.net/AllNewService/best/result').subscribe(
      data => {
        console.log(data);
        this.bestStudent = data;
       }, error => {
      }); 
  }

  checkBest(value : string){
    
    

}
getAchievement(){
  this.achievement1 = this.achievement; 
  this.achievement = "";
 
  console.log(this.achievement1)
}
getYear(){
  this.yearBest1 = this.yearBest
  this.yearBest = "";
 
  console.log(this.yearBest1)
}

addBest(value : string){

  this.userID = value;


  for(let i = 0 ; i < this.rUser.length ; i++){
      if(this.userID == this.rUser[i].UID){

          this.username = this.rUser[i].user_username;
          this.password = this.rUser[i].user_password;
          this.prefix = this.rUser[i].user_prefix;
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
          this.status = this.rUser[i].user_status;

          let json = {user_username : this.username || '', 
          user_password : this.password || '', 
          user_prefix : this.prefix || '',
          user_name : this.name || '',
          user_phone : this.phone || '',
          user_email : this.email || '',
          user_facebook : this.facebook || '',
          user_year : this.year || '',
          user_job : this.job || '',
          user_workname : this.workplace || '',
          user_workaddress : this.addwork || '',
          user_workphone : this.workphone || '',
          user_status : this.status || '',
          user_role : this.role || '',
          user_best : 1
         }
         console.log(json,this.username);

      
          this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.username,JSON.stringify(json)).toPromise().then(data => {
          if(data == 1){
          /*   alert('เพิ่มศิษย์เก่าเรียบร้อย');
            window.location.reload() */
          }else{
          
            console.log(data);
          }   
          },
          (error) => {
            console.log(error);
          });
      
  }    
  }





  console.log(value);
  for(let i = 0 ;  i < this.rUser.length ; i++ ){
      if(value == this.rUser[i].UID){
          this.prefix = this.rUser[i].user_prefix;
      }
  }


  console.log(this.prefix);
 
  let json = {
    best_achievement : this.achievement1 ,
    best_year : this.yearBest ,
    UID : value,
    user_prefix : this.prefix
  }
  console.log(json);

        if(window.confirm('ต้องการเพิ่มข้อมูล ?')){
            this.http.post('http://qpos.msuproject.net/AllNewService/best/addbeststudent',JSON.stringify(json)).toPromise().then(data => {
        if(data == 1){
          alert('เพิ่มข้อมูลเรียบร้อย');
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

  deleteBest(value : string ){
      this.userID = value;  
      console.log(this.userID);

  if(window.confirm('ต้องการลบเก่าดีเด่น ?')){
    for(let i = 0 ; i < this.bestStudent.length ; i++){
      if(this.userID == this.bestStudent[i].user_username){

        
          this.bestID = this.bestStudent[i].best_ID;
          let json ={
            best_ID : this.bestID
          }
          console.log(json);
         this.http.post('http://qpos.msuproject.net/AllNewService/best/delete',JSON.stringify(json)).toPromise().then(
                  data =>{
                        if(data == 1){
                        console.log(data);
                        }
                        else{          
                        }       
                  
                }, error =>{
                  alert('fail');
                });
        }

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
              this.workplace = this.rUser[i].user_workplace;
              this.addwork = this.rUser[i].user_workplace;
              this.job = this.rUser[i].user_job;
              this.workphone = this.rUser[i].user_workplace;
              this.role = this.rUser[i].user_role;
              this.status = this.rUser[i].user_status;
    
              let json = {user_username : this.username || '', 
              user_password : this.password || '', 
              user_prefix : this.prefix || '',
              user_name : this.name || '',
              user_phone : this.phone || '',
              user_email : this.email || '',
              user_facebook : this.facebook || '',
              user_year : this.year || '',
              user_job : this.job || '',
              user_workname : this.workplace || '',
              user_workaddress : this.addwork || '',
              user_workphone : this.workphone || '',
              user_status : this.status || '',
              user_role : this.role || '',
              user_best : 0
             }
             console.log(json,this.username);
    
           
                 this.http.post('http://qpos.msuproject.net/AllNewService/user/edit/'+this.username,
                 JSON.stringify(json)).toPromise().then(data => {
              if(data == 1){
                alert('เรียบร้อย');
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
}

  toggle() {
       
    this.show = !this.show;
    this.nrSelect = 0;
  }

  searchYear(){
    this.mygen = this.year;
    this.nrSelect = 0;
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
       
        this.rUser = data.filter( user => {
          return user.user_username.substring(0,2) == this.year;
        });
       }, error => {
      }); 
     
}

clearUser(){
  this.mygen = "0";
  this.year = '';
  this.nrSelect = 0;
  this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {  
      this.rUser = data;
     }, error => {
    }); 
}
SearchName(){
  console.log(this.rUser);
  if(this.sName == ""){
    window.location.reload();
     
  }else{
    this.rUser = this.rUser.filter(res =>{
      return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    })
  }
}

}