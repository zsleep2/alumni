import { Component, OnInit } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface Articles{
  'user_name':string,
  'webboard_ID':number,
  'webboard_date':string;
  'webboard_title':string,
  'webbaord_description':string  
}

@Component({
  selector: 'app-webboard',
  templateUrl: './webboard.component.html',
  styleUrls: ['./webboard.component.css']
})
export class WebboardComponent implements OnInit {
 

  constructor(private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, 
    private _auth: AuthService,
    private router2: ActivatedRoute)
     {


   }
  
 
   ngOnInit() {
    
  
  }
    
}
