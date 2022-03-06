import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MenuItem} from 'primeng/api';
import { FormsModule } from '@angular/forms';

interface lstNew{
 'new_ID': number;
 'new_date': string;
 'new_description': string;
 'new_image': string;
 'new_title': string;
}


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  user_username;
  items: MenuItem[];
  items1: MenuItem[];
  public myValue;
  
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

  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  public urlSource:string = "https://jsonplaceholder.typicode.com";
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  lstNew:lstNew[];
  status: string;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router2: ActivatedRoute
  )  {

    this.user_username = localStorage.getItem('user_username');
      
   }

  changePage(page:number){
    this.activePage = page;
    this.router1.navigate(['/new/'+this.user_username], {queryParams:{page:page}});
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
  
    this.status = localStorage.getItem('status');
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
    
  this.items1 = [
    {
      label: 'หน้าแรก', routerLink:['/home']
    },
    {
        
        label: 'สมาชิก', routerLink:['/login']
      
    },
    
    {
      label: ' อัลบั้ม ', routerLink:['/login']
      
  },
    {
        label: 'เว็บบอร์ด', routerLink:['/login']
    },
   
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

  this.http.get('http://qpos.msuproject.net/AllNewService/new/shownew').subscribe(
    data => {
      let json = JSON.stringify(data)
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length; 
         this.results = data;
        }, error => {
    });

    let params = this.router.snapshot.paramMap;
    if(params.has('new_ID')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('new_ID');
    }    

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
