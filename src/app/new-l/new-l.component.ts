import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GalleriaModule} from 'primeng/galleria';
import { AuthService } from '../auth.service';

interface lstNew{
  'new_ID': number;
  'new_date': string;
  'new_description': string;
  'new_image': string;
  'new_title': string;
  'new_status':number;
 }



@Component({
  selector: 'app-new-l',
  templateUrl: './new-l.component.html',
  styleUrls: ['./new-l.component.css']
})

export class NewLComponent implements OnInit {

  public  results;
  public allnew;
  user_username;

  constructor(  private http: HttpClient,
    private _auth: AuthService, 
    private router2: ActivatedRoute,) {

      this.user_username = router2.snapshot.params['user_username'];
     }
  ngOnInit(): void {

    this.http.get<lstNew[]>('http://qpos.msuproject.net/AllNewService/new/shownew').subscribe(
      data => {
        this.allnew = data.filter( anew =>{
            return anew.new_status == 1;
        });
      
       }, error => {
      }); 
  }
}

