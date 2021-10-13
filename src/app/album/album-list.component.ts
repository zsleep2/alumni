import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {MenuItem} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { FreeapiService } from '../freeapi.service';


interface lstAlbum{
  'album_ID':number;
  'album_name':string;
  'album_date':string;
}

interface lstPhoto{
  'album_ID':number;
  'photo_ID':number;
  'photo_file':string;
}


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  nameAlbum:string;
  user_username;
  items: MenuItem[];
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
  lstAlbum:lstAlbum[];
  AlbumSelected:Number;
  lstPhoto:lstPhoto[];
  allphoto;
  aPhoto;
  bPhoto;

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private _freeApi: FreeapiService,
    private router2: ActivatedRoute,
    ) { 
      
      this.user_username = router2.snapshot.params['user_username'];
      
    }

    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/album/'+this.myValue[0].user_username], {queryParams:{page:page}});
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
  
  this._freeApi.getAlbum().subscribe
  (
    data =>{
      this.lstAlbum = data;
    }
  )

  this.http.get('http://qpos.msuproject.net/AllNewService/album/showalbum').subscribe(
    data => {
      let json = JSON.stringify(data)
         // กรณี resuponse success
         // เก็บจำนวนรายการทั้งหมด ไปคำนวณหน้าจำนวนหน้า
         this.totalItem = json.length; 
         this.results = data;
        }, error => {
    });
    
    let params = this.router.snapshot.paramMap;
    if(params.has('album_ID')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('album_ID');
    }    

    

  

  }

  addAlbum(){

    let json = {album_name :this.nameAlbum}
    console.log(json);
    this.http.post('http://qpos.msuproject.net/AllNewService/album/addalbum',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            console.log('ok');
            this.router1.navigateByUrl('/album/'+this.myValue[0].user_username);
            }
            else{
              console.log('fail');
            }       
         
      }, error =>{
        alert('fail');
      });
  }

  openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }
  
  closeForm2() {
    document.getElementById("myForm2").style.display = "none";
  }

  onAlbumSelected(selectedAlbumID:any):void
  {
    this._freeApi.getPhoto(selectedAlbumID)
    .subscribe
    (
      data =>{
        this.lstPhoto = data;
      }
    )
  }

}
