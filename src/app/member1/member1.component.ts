import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface Articles{

  'user_username':string,
   'user_user_prefix':string,
  'user_name':string,
  'user_email':string,
  'user_phone':string,
  'user_facebook':string,
  'user_status':number
}



@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component implements OnInit {
 sName;
  text: string;
  text2: string;
  myValue;
  myPost;
  allUser ;
  user_username;
  user_username2
  spit;
  rUser;
  mArray:string[] = [];

  public iPage:number[] = [];
  public iPageStart:number = 1;
  public prevPage:number;
  public nextPage:number;
  public activePage:number;
  public totalItem:number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage:number = 15; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage:number;
  public maxShowPage:number;
  public useShowPage:number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู

  year;
 
  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService ,
    private router1: Router) { 
      this.user_username = router.snapshot.params['user_username'];
    this.user_username2 =  this.user_username.substring(0, 2);
     
    }
    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/member1/'+this.myValue[0].user_username], {queryParams:{page:page}});
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
                this.rUser = data.filter( u => {  
                  return u.user_status == 1;
        
                });
               }, error => {
              }); 
  }

ser(){

  this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {
      
      this.rUser = data.filter( ruser => {
          
        return ruser.user_username.substring(0,2) == this.year;

      });;
    }, error => {

      alert('No data!');
    }); 
}
cl(){
  this.year = '';
       this.http.get('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        this.rUser = data;
       }, error => {
      }); 
  }
  SearchName(){
    this.year = '';
    if(this.sName == ""){
        this.ngOnInit();
    }else{
      this.rUser = this.rUser.filter(res =>{
        return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      })
    }
  }
}

  



