import { Component, OnInit } from '@angular/core';;
import { HttpClientModule, HttpClient, HttpErrorResponse , JsonpClientBackend} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import {ButtonModule} from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
 

interface Articles{
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
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html', 
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  page: Number = 1;
  count: Number = 0; 
  tableSize: number = 5;
  public con:number;
  public results:any;
  public toggleButton: boolean = true;
  public photoID:number;
  public activePage:number;
  public pho;
  public photo : lstPhoto[];
  public myUser;
  imageDate:string;
  base64;
  public albumId;
  allPhoto;
  user_username;
  user_username2;
  items: MenuItem[];
  public myValue;
  newname;
  dephotoID;
  public show:boolean = false;
  albumName:string;
  public showup:boolean =false;
  myrole;
  changeText:boolean=false;
  config: any;
  constructor(private http: HttpClient,
    private router: ActivatedRoute,
    private _auth: AuthService,
    private router1: Router,
    private router4: ActivatedRoute,
  ) {
      
      this.user_username = localStorage.getItem('user_username');
      this.config = {
        itemsPerPage: 5,
        currentPage: 1
      };
    
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
   

      
    

  

    let params = this.router.snapshot.paramMap;
    if(params.has('album_ID')){
      this.photoID = +params.get('album_ID');
    }
    this.router
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
      }
    });

    this.albumId = params.get('album_ID');

    console.log(this.albumId);
    
    this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/album/showalbum')
    .subscribe(
      data => {
        // กรณี resuponse success
        
        this.results = data.filter( album => {
          
          return album.album_ID == this.photoID;

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

    


    
    this.http.get<lstPhoto[]>("http://qpos.msuproject.net/AllNewService/photo/showphoto")
    .subscribe(
      data => {
        // กรณี resuponse success
         
        this.photo = data.filter( photo => {
          
          return photo.album_ID == this.photoID;

        });

        console.log(this.photo);
       

      
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
  
  pageChanged(event){
    this.config.currentPage = event;
  }
  toggle() {
    
    console.log(this.results[0].user_username,this.user_username);
    if(this.myrole== "1"){
    
    this.show = !this.show;
    }else{
      if(this.results[0].user_username == this.user_username){
      
        this.show = !this.show;
      }else{
        alert('ไม่สามารถแก้ไขได้');
      }
     
    }
   
  }
  
/* enable(){
  console.log(this.results[0].user_username,this.user_username);
  if(this.user_role == "1"){
  this.toggleButton = false
  }else{
    if(this.results[0].user_username == this.user_username){
      this.toggleButton = false
    }else{
      alert('ไม่สามารถแก้ไขได้');
    }
   
  }
   
 } */

 save(){
  if(window.confirm('ยืนยันการเปลี่ยนชื่ออัลบั้ม ?')){
      let json = {
        album_name : this.albumName
      }
     /*  console.log(json);
      console.log(this.albumId); */
      this.http.post('http://qpos.msuproject.net/AllNewService/album/edit/'+this.albumId,JSON.stringify(json)).toPromise().then(data => {
                
        if(data == 1){
         
        }else{
          alert('แก้ไขเรียบร้อย');
          this.show = !this.show;
          this.ngOnInit();
         
        }
          
        },
        (error) => {
          console.log(error);
    });
   }
 }



 deletephoto(value : string){
        if(window.confirm('ต้องการลบรูปภาพ ?')){
            this.dephotoID = +value;
            let json = {
              photo_ID: this.dephotoID
            }

            this.http.post('http://qpos.msuproject.net/AllNewService/photo/delete',JSON.stringify(json)).toPromise().then(
            data =>{
                  if(data == 1){
                  console.log(data);
                  }
                  else{
                    console.log(data);
                    this.show = !this.show;
                    this.ngOnInit();
                  }       
              
            }, error =>{
              alert('fail');
            });
        
          }

  
 }
 

  getFile(files : FileList){
    console.log(files.item(0).name);
    let file = files.item(0);
    let reader = new FileReader();
    this.showup = !this.showup;
    reader.readAsDataURL(file);
    reader.onload = () => {
      /*   console.log(reader.result); */
      this.base64 = reader.result;
    };
  }

  addPhoto(){
    let json = {
      photo_file: this.base64,
      album_ID:this.albumId
      
    }

    this.http.post('http://qpos.msuproject.net/AllNewService/photo/addphoto',JSON.stringify(json)).
    toPromise().then(data => {
      
      console.log(data);
      this.show = !this.show;
      this.ngOnInit();
      },
      (error) => {
        console.log(error);
      });  

    console.log(json);
  }

  logOut(){
    this.router1.navigateByUrl('/home');
    localStorage.removeItem('status');
  
  }


}
