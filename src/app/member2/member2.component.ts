import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-member2',
  templateUrl: './member2.component.html',
  styleUrls: ['./member2.component.css']
})
export class Member2Component implements OnInit {
  
  


 
  
  
  constructor(private _auth: AuthService,private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router, ) { }

  ngOnInit(): void {
    
  }

  addAT(){

    
    
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  

}
