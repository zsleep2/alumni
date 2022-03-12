import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FreeapiService } from '../freeapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-addalbum',
  templateUrl: './addalbum.component.html',
  styleUrls: ['./addalbum.component.css']
})
export class AddalbumComponent implements OnInit {
  nameAlbum:string;
  user_username;
  items: MenuItem[];
  lstAlbum:lstAlbum[];
  AlbumSelected:Number;
  lstPhoto:lstPhoto[];
  img_file;
  myValue;
  myrole;
  user_username2;
  albumGen;
  nrSelect;
  gen;
  addAlbumForm: FormGroup;
  submitted = false;
  uid;
  eyear: number;
  syear: number;
  public year:number[]=[];
  rawData = [];
  min:number;
  rUser;
  max: number;
  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private _freeApi: FreeapiService,
    private formBuilder: FormBuilder) {

      this.user_username = localStorage.getItem('user_username');
      this.user_username2 = this.user_username.substring(0, 2);

     }

  ngOnInit(): void {
    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
     this.myrole = localStorage.getItem('role');
     this.uid = localStorage.getItem('uid');
    }
    this.gen = this.user_username.substring(0, 2);
    console.log(this.gen);

    this.addAlbumForm = this.formBuilder.group({
      nameAlbum : ['', Validators.required],
      gen : ['', Validators.required],
     
  }, {
  });

  this.http.get<Articles[]>('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
    data => {
      console.log(data);
      this.rUser = data.filter( u => {  
        return u.user_status == 1;

      });
     
     this.max = +data[0].user_username.substring(0,2)
     this.min = +data[data.length-1].user_username.substring(0,2) 
     for(var i=this.max; i>=this.min; i--){
    
    
        this.rawData.push(i);
      
      
      }
      console.log(this.rawData);
     }, error => {
    });  
  
  this._freeApi.getAlbum().subscribe
  (
    data =>{
      this.lstAlbum = data;
    }
  )
}

get f() { return this.addAlbumForm.controls; } 

  

  addAlbum(){
    this.submitted = true;
    
    let json = {album_name :this.addAlbumForm.value.nameAlbum,
    album_gen : this.addAlbumForm.value.gen,
    UID : this.uid}
    console.log(json);
    if(this.addAlbumForm.value.gen !== ""){
      this.http.post('http://qpos.msuproject.net/AllNewService/album/addalbum',JSON.stringify(json)).toPromise().then(
        data =>{
            if(data ==1){
                console.log(data);
                console.log('ok');
                this.router1.navigateByUrl('/album/'+this.user_username);
            }else{
              console.log(data);
            }
              
            
          
        }, error =>{
          alert('fail');
        });
    }else{
     alert('กรอกข้อมูลไม่ครบ');
    }
    
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

  onReset() {
    this.submitted = false;
    this.addAlbumForm.reset();
  }
getgen(){
  console.log(this.gen)
}

}
