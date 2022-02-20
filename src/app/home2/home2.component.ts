import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface lstNew{
  'new_ID': number;
  'new_date': string;
  'new_description': string;
  'new_image': string;
  'new_title': string;
  'new_status':number;
 }


@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
  myValue;
  user_username;
  new={};
  imageToShow:any;
  myURL:any
  allnew;
  title:string;
  des:string;
  fname:string;
  public myrole;
 
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

  
  public urlApi:string = "http://qpos.msuproject.net/AllNewService/new/addnew";
  public responseValue:any;  

  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService,
    private router2: ActivatedRoute,
    private router1: Router,) { 

    /* this.user_username = router2.snapshot.params['user_username']; */
  /*   console.log(this.user_username); */

  this.user_username = localStorage.getItem('user_username');
    
  }

  changePage(page:number){
    this.activePage = page;
    this.router1.navigate(['/new/'+this.myValue[0].user_username], {queryParams:{page:page}});
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

  onSubmit(f:any){
    let data = f.value;
    console.log(data);
    this.http.post(this.urlApi,JSON.stringify(data))    
    .subscribe(result =>{
      this.responseValue = result;
      console.log(result);
    },
    ( err:HttpErrorResponse ) => {
      // กรณี error
      if (err.error instanceof Error) {
        // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
        console.log('An error occurred:', err.error.message);
      }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }       
    });
  }


   ngOnInit(){

     const status = localStorage.getItem('status');
     if(status !== '1'){
        this.router1.navigateByUrl('/login');
     }else{
      this.myValue = this._auth.myData;
      console.log(this.myValue);
      console.log(this.user_username);
      if(this.myValue){
        this.myrole = this.myValue[0].user_role;

       /*  if(this.user_username !== this.myValue[0].user_username){
        this.router1.navigateByUrl('/login');
        localStorage.removeItem('status')
          } */
      }
     }
    
     

      this.http.get<lstNew[]>('http://qpos.msuproject.net/AllNewService/new/shownew').subscribe(
        data => {
          this.allnew = data.filter( anew =>{
              return anew.new_status == 1;
          });
        
         }, error => {
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
  openForm1() {
    document.getElementById("myForm1").style.display = "block";
  }
  
  closeForm1() {
    document.getElementById("myForm1").style.display = "none";
  }
  /* 
  upLoad(){
    
    let json = {
      new_title: this.title,
      new_description : this.des,
      new_image : this.myURL,
      new_date : new Date()
    }

    console.log(json);
   
    this.http.post('http://qpos.msuproject.net/AllNewService/new/addnew',JSON.stringify(json)).
    toPromise().then(data => {
      
      console.log(data);
      },
      (error) => {
        console.log(error);
      });  

} */

getFile(files : FileList){
  console.log(files.item(0).name);
  let file = files.item(0);
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    /*   console.log(reader.result); */
    this.myURL = reader.result;
  };
}


}