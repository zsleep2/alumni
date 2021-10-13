import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public myData;
  public myUser;
  public myPost;
  public regisData = [];
  private _loginUr1 = "http://qpos.msuproject.net/AllNewService/user/login";
  constructor(private http: HttpClient) {}

  

  getRegisdata(){
    return this.regisData;
  }

 }
