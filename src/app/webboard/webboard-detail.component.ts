import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/api';




interface Articles{
  'user_name':string,
  'webboard_ID':number,
  'webboard_date':string;
  'webboard_title':string,
  'webbaord_description':string  
}

interface Articles2{
 'comment_date':string;
  'comment_description': string;
  'user_name':string;
  'webboard_ID':number;
  'user_username':string;
}

@Component({
  selector: 'app-webboard-detail',
  templateUrl: './webboard-detail.component.html',
  styleUrls: ['./webboard-detail.component.css']
})
export class WebboardDetailComponent implements OnInit {
  public con:number;
  public results:any;
  public urlSource:string = "http://qpos.msuproject.net/AllNewService/webboard/webboardall";
  public postID:number;
  public activePage:number;
  public user_username:string;
  public user_username2:string;
  public myValue;
  public myUser;
  public id;
  public webid;
  public text:string;
  public comments = [];
  public com;
  public show:boolean = false;
  public showcom:boolean = false;
  public editcom = [];
  
  public webTitle:string;
  public webDes:string;
  public commentDes:string;
  public comid;
  public editid;
  public deleteid;
  public myid;
  items: MenuItem[];


  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router4: ActivatedRoute) { 

      this.user_username = router4.snapshot.params['user_username'];
    
      /* console.log('detail'+this.user_username); */

      }

  ngOnInit(): void {

    this.myValue = this._auth.myData;
    if(this.myValue){
    this.id = this.myValue[0].UID;
    this.user_username2 = this.myValue[0].user_username.substring(0, 2);
    this.myid = this.myValue[0].user_username;
    }
   

  
      this.items = [
        {
          label: 'หน้าแรก', routerLink:['/home2/'+this.myid]
        },
        {
            
            label: 'นักศึกษา', routerLink:['/member1/'+this.myid]
          
        },
        
        {
          label: ' อัลบั้มรูปภาพ ', routerLink:['/album/'+this.myid]
          
      },
        {
            label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.myid]
        },
        {
          label:'ออกจากระบบ', routerLink:['/home']
        }
  ]
    
    


    let params = this.router.snapshot.paramMap;
    if(params.has('webboard_ID')){
      this.postID = +params.get('webboard_ID');
    }
    this.router
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
      }
    });  
    this.webid = params.get('webboard_ID');


    

    
    // ส่วนของการดึงข้อมูลด้วย HttpClient get() method
    this.http.get<Articles[]>(this.urlSource)
    .subscribe(
      data => {
        // กรณี resuponse success
        this.results = data.filter( webboard => {
          return webboard.webboard_ID == this.postID;
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


    this.http.get<Articles2[]>("http://qpos.msuproject.net/AllNewService/comment/commentinfo")
    .subscribe(
      data => {
        // กรณี resuponse success
       
        this.comments = data.filter( comment => {
          return comment.webboard_ID == this.postID ;
        }); 
        console.log(this.comments);
        /* this.editcom = data.filter( comment => {
          return comment.webboard_ID == this.webid ;
        });   */
       
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
 

btnBack(){
  
}
addComment(){
  let json = {comment_description:this.text,
    comment_date:new Date(),
    webboard_ID : this.webid,
    UID : this.id
  }
   
  this.http.post('http://qpos.msuproject.net/AllNewService/comment/addcomment',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            console.log('ok');
            this.ngOnInit();
            }
            else{
              console.log('fail');
            }       
         
      }, error =>{
        alert('fail');
      });
  
    }

    toggle() {

      this.webTitle = this.results[0].webboard_title;
      this.webDes = this.results[0].webboard_description;
      console.log(this.results[0].user_username,this.myValue[0].user_username);
      if(this.myValue[0].user_role == "1"){
      
      this.show = !this.show;
      }else{
        if(this.results[0].user_username == this.myValue[0].user_username){
          this.show = !this.show;
          
        }else{
          alert('ไม่สามารถแก้ไขได้');
        }
      }

      
     
     
    }

    showCom(value : string){
      console.log(value);
      this.comid = +value;
      for (let i = 0; i < this.comments.length; i++) {
          if(this.comid == this.comments[i].comment_ID){
              console.log(this.comments[i].comment_description);
              if(this.comments[i].user_username == this.myValue[0].user_username){
                    this.showcom = !this.showcom
                   
              }else{
                alert('ไม่สามารถแก้ไขได้');
              }
          }
      }
  
    }


    editWeb(){
      if(window.confirm('ต้องการแก้ไขข้อมูล ?')){
        let json = {
         webboard_title : this.webTitle ,
         webboard_description : this.webDes,     
        }
        console.log(json);
        
        this.http.post('http://qpos.msuproject.net/AllNewService/webboard/edit/'+this.webid,JSON.stringify(json)).toPromise().then(data => {
                  
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

    deleteweb(){
      if(window.confirm('ต้องการลบเว็บบอร์ด ?')){
          
          let json = {
            webboard_ID : this.webid
          }
          console.log(json);
  
          this.http.post('http://qpos.msuproject.net/AllNewService/webboard/delete',JSON.stringify(json)).toPromise().then(
          data =>{
                if(data == 1){
                console.log(data);
                      
                }
                else{
                  console.log(data);
                  this.router1.navigateByUrl('/webboard/'+this.myValue[0].user_username);
                }       
            
          }, error =>{
            alert('fail');
          });
      
        }
  
      }

      editComment(value:string){
        this.editid = +value;
       console.log (this.commentDes);

        for (let i = 0; i < this.comments.length; i++) {
          if(this.editid == this.comments[i].comment_ID){
              
              if(this.comments[i].user_username == this.myValue[0].user_username){
                  console.log('ok');
                   if(window.confirm('ยืนยันแก้ไขข้อความ ?')){
                      let json = {
                      comment_description : this.commentDes,     
                      }
                  console.log(json);
                  this.http.post('http://qpos.msuproject.net/AllNewService/comment/edit/'+this.editid,JSON.stringify(json)).toPromise().then(data => {      
                    if(data == 1){
                    }else{
                      alert('แก้ไขเรียบร้อย');
                         this.showcom = !this.showcom
                         this.comid = '';
                         this.commentDes='';
                       this.ngOnInit();
                   
            
                      console.log(data);
                    }
                    },
                    (error) => {
                      console.log(error);
                });
                }
             }else{alert('ไม่สามารถแก้ไขได้');}
            }
          }
      }

      deleteComment(value : string){
          this.deleteid = +value;
          console.log('ลบได้');
          for (let i = 0; i < this.comments.length; i++) {
            if(this.deleteid == this.comments[i].comment_ID){       
                if(this.comments[i].user_username == this.myValue[0].user_username){
                    console.log('ok');
                     if(window.confirm('ยืนยันการลบคอมเม้น ?')){
                        let json = {
                        comment_ID : this.deleteid,
                        }
                    console.log(json);
                    this.http.post('http://qpos.msuproject.net/AllNewService/comment/delete',JSON.stringify(json)).toPromise().then(data => {      
                      if(data == 1){
                      }else{
                        alert('เสร็จสิ้น');
                        this.showcom = !this.showcom
            
                        this.ngOnInit();
                        console.log(data);
                      }
                      },
                      (error) => {
                        console.log(error);
                  });
                  }
               }else{alert('ไม่สามารถแก้ไขได้');}
              }
            }

      }

      openForm(value:string) {
        this.editid = +value;
        console.log(this.editid);
        document.getElementById("myForm").style.display = "block";
      }
      
      closeForm() {
        document.getElementById("myForm").style.display = "none";
      }
 
}
