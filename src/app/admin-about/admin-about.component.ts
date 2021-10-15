import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {
  myValue;
  user_username:any;
  constructor(private _auth: AuthService,
    private http: HttpClient,
    private router: ActivatedRoute,) { 
    this.user_username = router.snapshot.params['user_username'];
  }

  ngOnInit(): void {
    this.myValue = this._auth.myData;
  }

}
