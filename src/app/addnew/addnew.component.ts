import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  title;
  description;
  img_file;
  myValue;
  user_username;
  uid;
  addNewForm: FormGroup;
  submitted = false;
  constructor( private router: ActivatedRoute,
    private http: HttpClient, 
    private router1: Router,
    private _auth: AuthService,
    private formBuilder: FormBuilder) {
    this.user_username = localStorage.getItem('user_username');
   }

  ngOnInit(): void {

    const status = localStorage.getItem('status');
    if(status !== '1'){
       this.router1.navigateByUrl('/login');
    }else{
      this.uid = localStorage.getItem('uid');
    }
   
    

  }

  upLoadNew(){
    let json = {
      new_title: this.title,
      new_description : this.description,
      new_image : this.img_file,
      new_status: 0,
      UID : this.uid
    }
    console.log(json);

    this.http.post('http://qpos.msuproject.net/AllNewService/new/addnew',JSON.stringify(json)).
    toPromise().then(data => {
      
      console.log(data);
      if(data ==1){
        this.router1.navigateByUrl('/new/'+this.user_username);
      }else{
        alert("กรอกข้อมูลไม่ครบ");
      }

        
      
        
      
      },
      (error) => {
        console.log(error);
      });  
  }

  getFile(files : FileList){
    console.log(files.item(0).name);
    let file = files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      /*   console.log(reader.result); */
      this.img_file = reader.result;
    };
  }
  onReset() {
    this.submitted = false;
    this.addNewForm.reset();
  }

}
