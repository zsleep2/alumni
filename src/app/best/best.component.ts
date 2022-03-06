import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.css']
})
export class BestComponent implements OnInit {

  public year;
  public name;
  public username;
  public achievement;
  bestStudent;
  myValue;
  myrole;
  user_username;
  public bestID;
  public show:boolean = false;

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
  config: { itemsPerPage: number; currentPage: number; };
  rUser: any;
  sName;
  public sYear:number[]=[];
  public testData:number[]=[];
  myYear:any;
  min:number;
  max:number;
  d;
  status:any;
  username1;
  constructor(private _auth: AuthService,
    private http: HttpClient,
    private router1: Router,
    private router: ActivatedRoute) {
      this.user_username = localStorage.getItem('user_username');
      this.config = {
        itemsPerPage: 5,
        currentPage: 1
      };
      this.d = new Date();
      this.myYear = +this.d.getFullYear() +543;
      for(let i = this.myYear; i>this.myYear-20;i--){
          this.sYear.push(i);
      }
      console.log(this.sYear);
     }

     pageChanged(event){
      this.config.currentPage = event;
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
    if(status !== '1'){
       this.username1 = undefined;
       console.log(this.username1);
    }else{
     this.myrole = localStorage.getItem('role');
    }

    this.myrole = localStorage.getItem('role');
    console.log(this.myrole,this.status);
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
    
   
    this.http.get('http://qpos.msuproject.net/AllNewService/best/result').subscribe(
              data => {
                console.log(data);
                this.bestStudent = data;
                for(let i in data){
                  this.testData.push(data[i].best_year)
                /*   console.log(data[i].best_year); */
                }
                /* console.log(this.testData); */
               }, error => {
              }); 
              
  }

  toggle() {
    console.log('ok');
       this.show =! this.show;
  }

  SearchName(){
    this.year = '';
    if(this.sName == ""){
     this.ngOnInit();
    }else{
      this.bestStudent = this.bestStudent.filter(res =>{
        return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      })
    }
  }
  ser(){
  
    if(this.year == ""){
      this.ngOnInit();
     }else{
       this.bestStudent = this.bestStudent.filter(res =>{
         return res.best_year.toLocaleLowerCase().match(this.year.toLocaleLowerCase());
       })
     }
}

SearchA(){
  this.year = '';
  if(this.achievement == ""){
   this.ngOnInit();
  }else{
    this.bestStudent = this.bestStudent.filter(res =>{
      return res.best_achievement.toLocaleLowerCase().match(this.achievement.toLocaleLowerCase());
    })
  }
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
