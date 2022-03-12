import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Articles{
  'user_name':string,
  'webboard_ID':number,
  'webboard_date':string;
  'webboard_title':string,
  'webbaord_description':string,
  'webboard_gen':string;
}

@Component({
  selector: 'app-admin-web',
  templateUrl: './admin-web.component.html',
  styleUrls: ['./admin-web.component.css']
})
export class AdminWebComponent implements OnInit {
  public urlSource:string = "http://qpos.msuproject.net/AllNewService/webboard/webboardall";
  user_username;
  webboardId:number;
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
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  year;
  public webGen:any;
  rawData = [];
  min:number;
  max:number;
  public testData:number[]=[];
  myGen;


  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      this.user_username = localStorage.getItem('user_username');
    }
    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/admin_web/'+this.user_username], {queryParams:{page:page}});
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
    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }

    this.myGen = "0";
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

    this.http.get(this.urlSource).subscribe(
      data => {
        let json = JSON.stringify(data)
           this.totalItem = json.length; 
           this.results = data;

           for(let i in data){
            this.testData.push(+data[i].webboard_gen);
          }
          this.max = 0;
          this.min = 100;
          for(let i = 0 ; i < this.testData.length ; i++){
                if(this.testData[i] !== 0){
                   if(this.max < this.testData[i]){
                      this.max = this.testData[i]
                   }
                   if(this.min > this.testData[i]){
                      this.min = this.testData[i]
                   }
                }
          }
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

  webDelete(value : string)
  {
      this.webboardId = +value;
      let json = {webboard_ID:this.webboardId}
      console.log(json);
      if(window.confirm('ต้องการลบเว็บบอร์ด ?')){
          this.http.post('http://qpos.msuproject.net/AllNewService/webboard/delete',JSON.stringify(json)).toPromise().then(
            data =>{
              if(data == 1){
              console.log(data);
              }
              else{
                console.log(data);
                window.location.reload()
              }       
          
        }, error =>{
          alert('fail');
        });
      }
  }
  searchGen(){
    this.myGen = this.year;
    this.http.get<Articles[]>(this.urlSource).subscribe(
      data => {
       
        this.results = data.filter( web => {
          return web.webboard_gen == this.year;
        });
       }, error => {
      }); 
    }
    showGen(){
      this.http.get<Articles[]>(this.urlSource).subscribe(
        data => {
         
          this.results = data.filter( web => {
            return web.webboard_gen == "0";
          });
         }, error => {
        }); 
      }
    clearWeb(){
      this.year = '';
      this.http.get<Articles[]>(this.urlSource).subscribe(
        data => {  
          this.results = data;
         }, error => {
        }); 
    }

}
