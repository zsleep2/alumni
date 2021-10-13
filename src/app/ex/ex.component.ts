import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api/public_api';



@Component({
  selector: 'app-ex',
  templateUrl: './ex.component.html',
  styleUrls: ['./ex.component.css']
})
export class ExComponent implements OnInit {
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }


}
