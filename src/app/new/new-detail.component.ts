import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/api';

interface lstNew{
  'new_ID': number;
  'new_date': string;
  'new_description': string;
  'new_image': string;
  'new_title': string;
 }

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {

  public con:number;
  public results:any;
  public urlSource:string = "http://qpos.msuproject.net/AllNewService/post/webboardall";
  public postID:number;
  public activePage:number;
  public user_username:string;
  public user_username2:string;
  public myValue;
  public myUser;
  public id;
  public newId:number;
  public text:string;
  public comments = [];
  public com;
  public show:boolean = false;
  public nDes:string;
  public nTitle:string;
  base64;
  myrole;
 
 
  items: MenuItem[];

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router4: ActivatedRoute,
    ) {

      this.user_username = localStorage.getItem('user_username');;

     }

  ngOnInit(): void {
    this.myrole = localStorage.getItem('role');
    
  
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
    

    
  let params = this.router.snapshot.paramMap;
  if(params.has('new_ID')){
    this.newId = +params.get('new_ID');
  }
  this.router
  .queryParams
  .subscribe((data: { page: any }) => {
    if(data!=null && data.page!=null){
      this.activePage = +data.page;   
    }
  });  
  
   
  this.http.get<lstNew[]>('http://qpos.msuproject.net/AllNewService/new/shownew')
    .subscribe(
      data => {
        // กรณี resuponse success
        
        this.results = data.filter( anew => {
          
          return anew.new_ID == this.newId;

        });
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

    

   
  }

  toggle() {
    this.nTitle = this.results[0].new_title;
    this.nDes = this.results[0].new_description;
    this.base64 = this.results[0].new_image;
    console.log(this.results[0].user_username,this.user_username);
    if(this.myrole == "1"){ 
    this.show = !this.show;
    }else{
      if(this.results[0].user_username == this.user_username){
        this.show = !this.show;
      }else{
        alert('ไม่สามารถแก้ไขได้');
      }
     
    }
   
  }

  save(){
    if(window.confirm('ต้องการแก้ไขข้อมูล ?')){
        let json = {
         new_title : this.nTitle ,
         new_description : this.nDes,
         new_image : this.base64
        }
        console.log(json);
        
        this.http.post('http://qpos.msuproject.net/AllNewService/new/edit/'+this.newId,JSON.stringify(json)).toPromise().then(data => {
                  
          if(data == 1){
           
          }else{
            alert('แก้ไขเรียบร้อย');
            this.show = !this.show;
            this.ngOnInit();
            console.log(data);
          }
            
          },
          (error) => {
            console.log(error);
      });
    }
  }

  getFile(files : FileList){
    console.log(files.item(0).name);
    let file = files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      /*   console.log(reader.result); */
      this.base64 = reader.result;
    };
  }

  deletenew(){
    if(window.confirm('ต้องการลบข่าว ?')){
        
        let json = {
          photo_ID: this.newId
        }
        console.log(json);

        this.http.post('http://qpos.msuproject.net/AllNewService/new/delete',JSON.stringify(json)).toPromise().then(
        data =>{
              if(data == 1){
              console.log(data);
              this.router1.navigateByUrl('/new/'+this.myValue[0].user_username);
              }
              else{
                console.log(data);
                  
              }       
          
        }, error =>{
          alert('fail');
        });
    
      }


}
logOut(){
  this.router1.navigateByUrl('/home');
  localStorage.removeItem('status');

}

}
