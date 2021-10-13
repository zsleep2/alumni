import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user_username;
  regisData = [];
  constructor(private router: ActivatedRoute, 
    private router1: Router,
    private _auth: AuthService) { 
    this.user_username = router.snapshot.params['user_username'];
  }

  ngOnInit(): void {
     this.regisData = this._auth.getRegisdata();
     console.log(this.regisData);
  }
  go(){
    this.router1.navigateByUrl('/home2/'+this.user_username);
  }
  logout(){
    this.router1.navigateByUrl('/home');
  }
  
}
