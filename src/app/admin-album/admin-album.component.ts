import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admin-album',
  templateUrl: './admin-album.component.html',
  styleUrls: ['./admin-album.component.css']
})
export class AdminAlbumComponent implements OnInit {
  user_username;
  albumID;
  public updateId:number;
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
 results:any;// กำหนดตัวแปร เพื่อรับค่า
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private router2: ActivatedRoute, 
    private _auth: AuthService) {

      this.user_username = router2.snapshot.params['user_username'];

     }

     changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/album/'+this.user_username], {queryParams:{page:page}});
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

    this.http.get('http://qpos.msuproject.net/AllNewService/album/showalbum').subscribe(
      data => {
        let json = JSON.stringify(data)
           // กรณี resuponse success
           // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
           this.totalItem = json.length; 
           this.results = data;
           console.log(this.results);
          }, error => {
      });

    
    
      
    

  }


      Update(value : string)
    {
        this.updateId = +value;
        let json = {album_ID:this.updateId}
        console.log(json);
        
        this.http.post('http://qpos.msuproject.net/AllNewService/album/delete',JSON.stringify(json)).toPromise().then(
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
