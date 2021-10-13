import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FreeapiService } from '../freeapi.service';
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


  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private _freeApi: FreeapiService) {

      this.user_username = router.snapshot.params['user_username'];

     }

  ngOnInit(): void {

    this.items = [
      {
          label: 'หน้าแรก', routerLink:['/home2/'+this.user_username],
    
      },
      
      {
        label: 'นักศึกษาปัจจุบัน', routerLink:['/member1/'+this.user_username],
       
      },
      {
        label: 'ศิษย์เก่า', routerLink:['/member2/'+this.user_username],
    },
      {
        label: ' อัลบั้มรูปภาพ ', routerLink:['/album/'+this.user_username],
      },
      {
        label: 'เว็บบอร์ด', routerLink:['/webboard/'+this.user_username],
    },
    {
      label:'ออกจากระบบ', routerLink:['/home'],
    }


      
      /* {separator:true}, */
  ];

  this._freeApi.getAlbum().subscribe
  (
    data =>{
      this.lstAlbum = data;
    }
  )
}

  

  addAlbum(){

    let json = {album_name :this.nameAlbum}
    this.http.post('http://qpos.msuproject.net/AllNewService/album/addalbum',JSON.stringify(json)).toPromise().then(
      data =>{
          
            console.log(data);
            console.log('ok');
            this.router1.navigateByUrl('/album/'+this.user_username);
          
         
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

  getFile(files : FileList){
    console.log(files.item(0).name);
    let file = files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      /*   console.log(reader.result); */
      this.img_file = reader.result;
    };
  } 
  
  addPhoto(){
    let json = {
      photo_file: this.img_file,
      album_ID:this.AlbumSelected
      
    }

    this.http.post('http://qpos.msuproject.net/AllNewService/photo/addphoto',JSON.stringify(json)).
    toPromise().then(data => {
      
      console.log(data);
          
      },
      (error) => {
        console.log(error);
      });  

    console.log(json);
  }


}
