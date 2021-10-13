import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DateRange } from 'igniteui-angular';
import { IgxTimePickerComponent } from "igniteui-angular";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addativity',
  templateUrl: './addativity.component.html',
  styleUrls: ['./addativity.component.css']
})
export class AddativityComponent implements OnInit {

  text : string;
  date1:string;
  date2:string;
  time1:string;
  time2:string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  addAT(){

    let json = {activity_description : this.text,
      activity_datestart : this.date1,
      activity_dateend : this.date2,
      activity_timestart : this.time1,
      activity_timeend : this.time2}
    console.log(json);
      this.http.post('http://qpos.msuproject.net/AllNewService/activity/addactivity',JSON.stringify(json))
    .subscribe((resposne) => {
      console.log(resposne);
    });
    
  }
}
