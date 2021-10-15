import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
