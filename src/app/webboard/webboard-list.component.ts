import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MenuItem} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';

interface Articles{
  'user_name':string,
  'webboard_ID':number,
  'webboard_date':string;
  'webboard_title':string,
  'webbaord_description':string,
  'webboard_gen':string;
}

@Component({
  selector: 'app-webboard-list',
  templateUrl: './webboard-list.component.html',
  styleUrls: ['./webboard-list.component.css']
})
export class WebboardListComponent implements OnInit {
  public urlSource:string = "http://qpos.msuproject.net/AllNewService/webboard/webboardall";
  myValue;
  myUser
  myPost;
  allPost;
  user_username;
  user_username2;
  public myrole;
  public con:number;
  items: MenuItem[];
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
  webgen=0;
  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  public myGen;
  public year;
  public show:boolean = false;

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router2: ActivatedRoute) {

      this.user_username = router2.snapshot.params['user_username'];
      this.user_username2 = this.user_username.substring(0, 2);
      this.webgen = this.user_username2.toString();

     /*  console.log('list'+this.user_username); */
     }

    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/webboard'+this.user_username], {queryParams:{page:page}});
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
   
  ngOnInit(){
    this.myValue = this._auth.myData;
    this.myrole = this.myValue[0].user_role;
    this.myGen = "0";
    var years = 70;
    var till = 50;
    var options = "";
    for(var y=years; y>=till; y--){
    options += "<option>"+ y +"</option>";
    }
    document.getElementById("year").innerHTML = options;
  
      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: 'นักศึกษา', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' อัลบั้มรูปภาพ ', routerLink:['/album/'+this.user_username]
          
      },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username]
        },
        {
          label:'ออกจากระบบ', routerLink:['/home']
        }
  ]
    

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

     // ส่วนของการดึงข้อมูลด้วย HttpClient get() method
     this.http.get<Articles[]>(this.urlSource)
     .subscribe(
       data => {
        console.log(data);
       let json = JSON.stringify(data)
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length;
        console.log(this.user_username);
        
         if(this.user_username.substring(0, 2) == "pi"){

            this.results = data;

         }else{
            this.results = data.filter( result => { 
            return result.webboard_gen == "0";

        });;
         }
        
       },
       ( err:HttpErrorResponse ) => {
         // กรณี error
         if (err.error instanceof Error) {
           // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
           console.log('An error occurred:', err.error.message);
         }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
           console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
         }       
       }
     ); 
     
     let params = this.router.snapshot.paramMap;
    if(params.has('webboard_ID')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('webboard_ID');
    }    
  }

  web(){
    this.myGen = "0";
     this.http.get<Articles[]>(this.urlSource)
     .subscribe(
       data => {
        console.log(data);
       let json = JSON.stringify(data)
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length; 
         this.results = data.filter( result => {
          
          return result.webboard_gen == "0";

        });;
       },
       ( err:HttpErrorResponse ) => {
         // กรณี error
         if (err.error instanceof Error) {
           // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
           console.log('An error occurred:', err.error.message);
         }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
           console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
         }       
       }
     ); 
     
  let params = this.router.snapshot.paramMap;
    if(params.has('webboard_ID')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('webboard_ID');
    }    
  }
  web1(){
    this.myGen = this.user_username2;
     // ส่วนของการดึงข้อมูลด้วย HttpClient get() method
     this.http.get<Articles[]>(this.urlSource)
     .subscribe(
       data => {
        console.log(data);
       let json = JSON.stringify(data)
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length; 
        
         if(this.user_username.substring(0, 2) == "pi"){

          this.results = data;

       }else{
         this.results = data.filter( result => {
          
          return result.webboard_gen == this.user_username2;
        });;
       }
         
       },
       ( err:HttpErrorResponse ) => {
         // กรณี error
         if (err.error instanceof Error) {
           // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
           console.log('An error occurred:', err.error.message);
         }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
           console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
         }       
       }
     ); 
     
    let params = this.router.snapshot.paramMap;
    if(params.has('webboard_ID')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('webboard_ID');
    }    
    
  }

  allWeb(){
    
    this.http.get(this.urlSource).subscribe(
    data => {
      let json = JSON.stringify(data)
         this.totalItem = json.length; 
         this.results = data;
        }, error => {
    });

  }

  searchYear(){
    this.myGen = this.year;
    this.http.get<Articles[]>(this.urlSource).subscribe(
      data => {
       
        this.results = data.filter( res => {
          return res.webboard_gen == this.year;
        });
       }, error => {
      }); 
     
}
    
      
}
