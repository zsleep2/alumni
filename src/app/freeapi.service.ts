import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeapiService {

  constructor(private httpclient : HttpClient) { }


  getAlbum(): Observable<any>
  {
    return this.httpclient.get('http://qpos.msuproject.net/AllNewService/album/showalbum'); 
  }

  getPhoto(selectedAlbumID:string): Observable<any>
  {
    let params1 = new HttpParams().set('album_ID',selectedAlbumID);
    return this.httpclient.get('http://qpos.msuproject.net/AllNewService/photo/photoinfo',{params:params1})
  }


}
