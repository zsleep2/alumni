import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  
})
export class PostComponent implements OnInit {
  text: string;
  text2: string;
  tag;
  posts: any; 
  uid;
  myValue;
  myUser;
  myPost;
  myName;
  user_username;
  user_name;
  normal;
  nrSelect;
  user_id;
  user_username2;
  public myrole;

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService) { 
 
    this.user_username = router.snapshot.params['user_username'];
    this.user_username2 = this.user_username.substring(0, 2);

  }

  ngOnInit(): void {

      if(this.myValue){
      this.myValue = this._auth.myData;
      this.myrole = this.myValue[0].user_role;
      }
     
  }

  post(){
    
      this.tag=this.nrSelect;
      let json = {webboard_title:this.text, 
        webboard_description:this.text2,
        webboard_date: new Date(),
        webboard_gen:this.tag,
        UID:this.myValue[0].UID }
        console.log(json);
    
      this.http.post('http://qpos.msuproject.net/AllNewService/webboard/addwebboard',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            console.log('ok');
            this.router1.navigateByUrl('/webboard/'+this.user_username);
            }
            else{
              console.log('fail');
            }       
         
      }, error =>{
        alert('fail');
      });
      
  }

}
