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
  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private _freeApi: FreeapiService,
    private formBuilder: FormBuilder) {

      this.user_username = router.snapshot.params['user_username'];
      this.user_username2 = this.user_username.substring(0, 2);

     }

  ngOnInit(): void {
     this.myValue = this._auth.myData;
      if(this.myValue){
    this.myrole = this.myValue[0].user_role;
    }
      this.gen = this.user_username.substring(0, 2);
    console.log(this.gen);

    this.addAlbumForm = this.formBuilder.group({
      nameAlbum : ['', Validators.required],
      gen : ['', Validators.required],
     
  }, {
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
    UID : this.myValue[0].UID}
    console.log(json);
    
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


}
