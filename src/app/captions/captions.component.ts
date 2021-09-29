import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-captions',
  templateUrl: './captions.component.html',
  styleUrls: ['./captions.component.css']
})
export class CaptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  captions = new FormControl('');

  updateCaptions(){
    alert("Added Captions");
  }

}
