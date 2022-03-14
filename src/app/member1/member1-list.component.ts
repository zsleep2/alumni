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
  'user_status':number,
  'UID':number
}



@Component({
  selector: 'app-member1-list',
  templateUrl: './member1-list.component.html',
  styleUrls: ['./member1-list.component.css']
})
export class Member1ListComponent implements OnInit {

  sName;
  sJob;
  sAddress
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
  public min;
  public max;
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
  mygen;
  year;
  myrole;
  public show:boolean = false;
  public allyear;
  rawData = [];
  items: { label: string; routerLink: string[]; }[];
  config: { itemsPerPage: number; currentPage: number; };

  constructor(private router: ActivatedRoute,
    private http: HttpClient,
    private _auth: AuthService ,
    private router1: Router) { 
      this.user_username = localStorage.getItem('user_username');
    this.user_username2 =  this.user_username.substring(0, 2);
    this.config = {
      itemsPerPage: 20,
      currentPage: 1
    };
     
    }
    changePage(page:number){
      this.activePage = page;
      this.router1.navigate(['/member1/'+this.user_username], {queryParams:{page:page}});
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
       this.myrole = localStorage.getItem('role');
    }
    
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
   
   this.mygen="0";
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
              
              this.max = +data[0].user_username.substring(0,2)
              this.min = +data[data.length-1].user_username.substring(0,2) 
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
  pageChanged(event){
    this.config.currentPage = event;
  }

  county = [
    { id:1, name: "กรุงเทพมหานคร"},
    { id:2, name: "สมุทรปราการ"},
    { id:3, name: "นนทบุรี"},
    { id:4, name: "ปทุมธานี"},
    { id:5, name: "พระนครศรีอยุธยา"},
    { id:6, name: "อ่างทอง"},
    { id:7, name: "ลพบุรี"},
    { id:8, name: "สิงห์บุรี"},
    { id:9, name: "ชัยนาท"},
    { id:10, name: "สระบุรี"},
    { id:11, name: "ชลบุรี"},
    { id:12, name: "ระยอง"},
    { id:13, name: "จันทบุรี"},
    { id:14, name: "ตราด"},
    { id:15, name: "ฉะเชิงเทรา"},
    { id:16, name: "ปราจีนบุรี"},
    { id:17, name: "นครนายก"},
    { id:18, name: "สระแก้ว"},
    { id:19, name: "นครราชสีมา"},
    { id:20, name: "บุรีรัมย์"},
    { id:21, name: "สุรินทร์"},
    { id:22, name: "ศรีสะเกษ"},
    { id:23, name: "อุบลราชธานี"},
    { id:24, name: "ยโสธร"},
    { id:25, name: "ชัยภูมิ"},
    { id:26, name: "อำนาจเจริญ"},
    { id:27, name: "หนองบัวลำภู"},
    { id:28, name: "ขอนแก่น"},
    { id:29, name: "อุดรธานี"},
    { id:30, name: "เลย"},
    { id:31, name: "หนองคาย"},
    { id:32, name: "มหาสารคาม"},
    { id:33, name: "ร้อยเอ็ด"},
    { id:34, name: "กาฬสินธุ์"},
    { id:35, name: "สกลนคร"},
    { id:36, name: "นครพนม"},
    { id:37, name: "มุกดาหาร"},
    { id:38, name: "เชียงใหม่"},
    { id:39, name: "ลำพูน"},
    { id:40, name: "ลำปาง"},
    { id:41, name: "อุตรดิตถ์"},
    { id:42, name: "แพร่"},
    { id:43, name: "น่าน"},
    { id:44, name: "พะเยา"},
    { id:45, name: "เชียงราย"},
    { id:46, name: "แม่ฮ่องสอน"},
    { id:47, name: "นครสวรรค์"},
    { id:48, name: "อุทัยธานี"},
    { id:49, name: "กำแพงเพชร"},
    { id:50, name: "ตาก"},
    { id:51, name: "สุโขทัย"},
    { id:52, name: "พิษณุโลก"},
    { id:53, name: "พิจิตร"},
    { id:54, name: "เพชรบูรณ์"},
    { id:55, name: "ราชบุรี"},
    { id:56, name: "กาญจนบุรี"},
    { id:57, name: "สุพรรณบุรี"},
    { id:58, name: "นครปฐม"},
    { id:59, name: "สมุทรสาคร"},
    { id:60, name: "สมุทรสงคราม"},
    { id:61, name: "เพชรบุรี"},
    { id:62, name: "ประจวบคีรีขันธ์"},
    { id:63, name: "นครศรีธรรมราช"},
    { id:64, name: "กระบี่"},
    { id:65, name: "พังงา"},
    { id:66, name: "ภูเก็ต"},
    { id:67, name: "สุราษฎร์ธานี"},
    { id:68, name: "ระนอง"},
    { id:69, name: "ชุมพร"},
    { id:70, name: "สงขลา"},
    { id:71, name: "สตูล"},
    { id:72, name: "ตรัง"},
    { id:73, name: "พัทลุง"},
    { id:74, name: "ปัตตานี"},
    { id:75, name: "ยะลา"},
    { id:76, name: "นราธิวาส"},
    { id:77, name: "บึงกาฬ"}
  ];

  ser(){
    this.mygen = this.year;
  
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
  this.mygen = "0";
  this.year = '';
       this.http.get('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        this.rUser = data;
       }, error => {
      }); 
      console.log(this.rUser);
  }
  SearchName(){
    this.year = '';
    if(this.sName == ""){
    this.rawData = []
     this.ngOnInit();
    
    }else{
      this.rUser = this.rUser.filter(res =>{
        return res.user_name.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      })
    }
  }
  SearchJob(){
    this.year = '';
    if(this.sJob == ""){
      this.rawData = []
     this.ngOnInit();
    }else{
      this.rUser = this.rUser.filter(res =>{
        return res.user_job.toLocaleLowerCase().match(this.sJob.toLocaleLowerCase());
      })
    }
  }
  SearchAddress(){
    this.year = '';
    if(this.sAddress == ""){
      this.rawData = []
     this.ngOnInit();
    }else{
      this.rUser = this.rUser.filter(res =>{
        return res.user_workaddress.toLocaleLowerCase().match(this.sAddress.toLocaleLowerCase());
      })
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

