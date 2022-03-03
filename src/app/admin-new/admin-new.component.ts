import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css']
})
export class AdminNewComponent implements OnInit {
  user_username;
  public myValue;
  public iPage:number[] = [];
  public iPageStart:number = 1;
  public prevPage:number;
  public nextPage:number;
  public activePage:number;
  public totalItem:number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage:number = 5; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage:number;
  public maxShowPage:number;
  public useShowPage:number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  public checkid;
  public nTitle;
  public nDes;
  public base64;
  public newid;

  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
      
      this.user_username = localStorage.getItem('user_username');

    }

    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/addmin_new/'+this.user_username], {queryParams:{page:page}});
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
    }else{
   
    }

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
      console.log(data);
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length; 
         this.results = data;
        }, error => {
    });
  }

checkNew(value : string){
  this.checkid = +value;
  console.log (this.checkid);

  for(let i = 0; i < this.results.length;i++){
      if(this.checkid == this.results[i].new_ID){
      this.nTitle = this.results[i].new_title;
      this.nDes = this.results[i].new_description;
      this.base64 = this.results[i].new_image;

      if(this.results[i].new_status == 0){
          let json = {
          new_title : this.nTitle ,
          new_description : this.nDes,
          new_image : this.base64,
          new_status : 1
          }
          console.log(json);  
          if(window.confirm('คุณต้องการเปิดสถานะของข่าว '+this.nTitle+' ?')){
          this.http.post('http://qpos.msuproject.net/AllNewService/new/edit/'+this.checkid,JSON.stringify(json)).toPromise().then(data => {
                      
              if(data == 1){
              
              }else{
                alert('เสร็จสิ้น');
                window.location.reload()
                console.log(data);
              }
                
              },
              (error) => {
                console.log(error);
          });
        }
      }else{
        let json = {
          new_title : this.nTitle ,
          new_description : this.nDes,
          new_image : this.base64,
          new_status : 0
          }
          console.log(json);  
          if(window.confirm('คุณต้องการปิดสถานะของข่าว '+this.nTitle+' ?')){
          this.http.post('http://qpos.msuproject.net/AllNewService/new/edit/'+this.checkid,JSON.stringify(json)).toPromise().then(data => {
                      
              if(data == 1){
              
              }else{
                alert('เสร็จสิ้น');
                window.location.reload()
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
  deletenew(value : string){
    this.newid = +value;
    if(window.confirm('ต้องการลบข่าว ?')){
        
        let json = {
          new_ID: this.newid
        }
        console.log(json);

        this.http.post('http://qpos.msuproject.net/AllNewService/new/delete',JSON.stringify(json)).toPromise().then(
        data =>{
              if(data == 1){
            
              }
              else{
              console.log("yes");
              this.ngOnInit();
              }       
          
        }, error =>{
          alert('fail');
        });
    
      }
    }

}
