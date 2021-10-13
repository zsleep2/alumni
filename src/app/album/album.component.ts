import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
  }

  openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }
  
  closeForm2() {
    document.getElementById("myForm2").style.display = "none";
  }

}
