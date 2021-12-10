import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  public achievement;
  bestStudent;
  myValue;
  myrole;
  public bestID;
  public show:boolean = false;

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
          
          return user.user_best == 1;
        });
       }, error => {
      }); 
  }

  deleteBest(value : string){
    if(window.confirm('ต้องการลบศิษเก่าดีเด่น ?')){
      this.bestID = +value;
      let json = {
        goodstudent_ID : this.bestID
      }
      this.http.post('http://qpos.msuproject.net/AllNewService/goodstudent/delete',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            }
            else{
              alert('เสร็จสิ้น');
              this.show = !this.show;
              this.ngOnInit();
            }       
        
      }, error =>{
        alert('fail');
      });
    }  
  }

  toggle() {
       
    this.show = !this.show;
    this.nrSelect = 0;
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
    window.location.reload();
     
  }else{
    this.rUser = this.rUser.filter(res =>{
      return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    })
  }
}

  addBest(){
    let json ={
      goodstudent_year : this.year,
      goodstudent_name : this.name,
      goodstudent_username : this.username,
      goodstudent_achievement : this.achievement
    }
    console.log(json);
  }

}
