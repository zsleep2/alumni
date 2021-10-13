import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  public bestID;
  public show:boolean = false;
  constructor(private _auth: AuthService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.myValue = this._auth.myData;
    this.myrole = this.myValue[0].user_role;
   
    this.http.get('http://qpos.msuproject.net/AllNewService/goodstudent/result').subscribe(
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
