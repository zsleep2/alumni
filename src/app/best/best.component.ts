import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.css']
})
export class BestComponent implements OnInit {

  public year;
  public name;
  public username;
  public achievement;
  bestStudent;
  myValue;
  myrole;
  user_username;
  public bestID;
  public show:boolean = false;
  constructor(private _auth: AuthService,
    private http: HttpClient,
    private router1: Router,) {
      this.user_username = localStorage.getItem('user_username');
     }

  ngOnInit(): void {

    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
     this.myrole = localStorage.getItem('role');
    }
    
   
    this.http.get('http://qpos.msuproject.net/AllNewService/best/result').subscribe(
              data => {
                console.log(data);
                this.bestStudent = data;
               }, error => {
              }); 
  }

  toggle() {
    console.log('ok');
       this.show =! this.show;
  }

  deleteBest(value : string){
    if(window.confirm('ต้องการลบศิษเก่าดีเด่น ?')){
      this.bestID = +value;
      let json = {
        goodstudent_ID : this.bestID
      }
      this.http.post('http://qpos.msuproject.net/AllNewService/goodstudent/delete',JSON.stringify(json)).toPromise().then(
      data =>{
            if(data == 1){
            console.log(data);
            }
            else{
              alert('เสร็จสิ้น');
              this.show = !this.show;
              this.ngOnInit();
            }       
        
      }, error =>{
        alert('fail');
      });
    }  
  }

  addBest(){
    let json ={
      goodstudent_year : this.year,
      goodstudent_name : this.name,
      goodstudent_username : this.username,
      goodstudent_achievement : this.achievement
    }
    console.log(json);
  }
}
