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
  myrole;


  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router4: ActivatedRoute) {
      this.user_username = localStorage.getItem('user_username');;
      }

  ngOnInit(): void {

    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
      this.id = localStorage.getItem('uid');
      this.user_username2 = this.user_username.substring(0, 2);
      this.myrole = localStorage.getItem('role');
    }
      this.items = [
        {
          label: '?????????????????????', routerLink:['/home2/'+this.user_username]
        },
        {
            
            label: '??????????????????', routerLink:['/member1/'+this.user_username]
          
        },
        
        {
          label: ' ????????????????????? ', routerLink:['/album/'+this.user_username]
        },
        {
            label: '???????????????????????????', routerLink:['/webboard/'+this.user_username]
        },
        
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


    

    
    // ????????????????????????????????????????????????????????????????????? HttpClient get() method
    this.http.get<Articles[]>(this.urlSource)
    .subscribe(
      data => {
        // ???????????? resuponse success
        this.results = data.filter( webboard => {
          return webboard.webboard_ID == this.postID;
        });
      },
      ( err:HttpErrorResponse ) => {
        // ???????????? error
        if (err.error instanceof Error) {
          // ???????????? error ??????????????????????????????????????? ???????????? ???????????????????????????????????????????????? error ????????????
          console.log('An error occurred:', err.error.message);
        }else{ // ???????????? error ???????????? server ??????????????????????????? ,server error 
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }       
      }

      
    ); 


    this.http.get<Articles2[]>("http://qpos.msuproject.net/AllNewService/comment/commentinfo")
    .subscribe(
      data => {
        // ???????????? resuponse success
       
        this.comments = data.filter( comment => {
          return comment.webboard_ID == this.postID ;
        }); 
        console.log(this.comments);
        /* this.editcom = data.filter( comment => {
          return comment.webboard_ID == this.webid ;
        });   */
       
      },
      ( err:HttpErrorResponse ) => {
        // ???????????? error
        if (err.error instanceof Error) {
          // ???????????? error ??????????????????????????????????????? ???????????? ???????????????????????????????????????????????? error ????????????
          console.log('An error occurred:', err.error.message);
        }else{ // ???????????? error ???????????? server ??????????????????????????? ,server error 
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
            this.text = '';
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
      console.log(this.results[0].user_username,this.user_username);
      if(this.myrole == "1"){
      
      this.show = !this.show;
      }else{
        if(this.results[0].user_username == this.user_username){
          this.show = !this.show;
          
        }else{
          alert('???????????????????????????????????????????????????');
        }
      }

      
     
     
    }

    showCom(value : string){
      console.log(value);
      this.comid = +value;
      for (let i = 0; i < this.comments.length; i++) {
          if(this.comid == this.comments[i].comment_ID){
             
                this.showcom = !this.showcom
             
                if(this.comments[i].user_username == this.user_username){
                  this.showcom = !this.showcom
                 console.log('ok');
                }else{
                  alert('???????????????????????????????????????????????????');
                }
              
             
          }
      }
  
    }


    editWeb(){
      if(window.confirm('?????????????????????????????????????????????????????? ?')){
        let json = {
         webboard_title : this.webTitle ,
         webboard_description : this.webDes,     
        }
        console.log(json);
        
        this.http.post('http://qpos.msuproject.net/AllNewService/webboard/edit/'+this.webid,JSON.stringify(json)).toPromise().then(data => {
                  
          if(data == 1){
           
          }else{
            alert('??????????????????????????????????????????');
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
      if(window.confirm('?????????????????????????????????????????????????????? ?')){
          
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
                  this.router1.navigateByUrl('/webboard/'+this.user_username);
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
              
              if(this.comments[i].user_username == this.user_username){
                  console.log('ok');
                   if(window.confirm('?????????????????????????????????????????????????????? ?')){
                      let json = {
                      comment_description : this.commentDes,     
                      }
                  console.log(json);
                  this.http.post('http://qpos.msuproject.net/AllNewService/comment/edit/'+this.editid,JSON.stringify(json)).toPromise().then(data => {      
                    if(data == 1){
                    }else{
                      alert('??????????????????????????????????????????');
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
             }else{alert('???????????????????????????????????????????????????');}
            }
          }
      }

      deleteComment(value : string){
          this.deleteid = +value;
          console.log('???????????????');
          for (let i = 0; i < this.comments.length; i++) {
            if(this.deleteid == this.comments[i].comment_ID){       
                if(this.comments[i].user_username == this.user_username){
                    console.log('ok');
                     if(window.confirm('?????????????????????????????????????????????????????? ?')){
                        let json = {
                        comment_ID : this.deleteid,
                        }
                    console.log(json);
                    this.http.post('http://qpos.msuproject.net/AllNewService/comment/delete',JSON.stringify(json)).toPromise().then(data => {      
                      if(data == 1){
                      }else{
                        alert('???????????????????????????');
                        this.showcom = !this.showcom
            
                        this.ngOnInit();
                        console.log(data);
                      }
                      },
                      (error) => {
                        console.log(error);
                  });
                  }
               }else{alert('???????????????????????????????????????????????????');}
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

      logOut(){
        this.router1.navigateByUrl('/home');
        localStorage.removeItem('status');
        localStorage.removeItem('user_username');
        localStorage.removeItem('role');
        localStorage.removeItem('uid');
        localStorage.removeItem('password');
      }
 
}
