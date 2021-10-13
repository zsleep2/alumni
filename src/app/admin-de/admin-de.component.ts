import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-de',
  templateUrl: './admin-de.component.html',
  styleUrls: ['./admin-de.component.css']
})
export class AdminDeComponent implements OnInit {
  user_username;
  rUser;
  constructor(private http: HttpClient ,
    private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) {

      this.user_username = router.snapshot.params['user_username'];

     }

  ngOnInit(): void {
    this.http.get('http://qpos.msuproject.net/AllNewService/user/result').subscribe(
      data => {
        this.rUser = data;
       }, error => {
      }); 
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

}
