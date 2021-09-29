import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./hashtags.component.css']
})
export class HashtagsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hashtags = new FormControl('');

  updateHashtags(){
    alert("Added Hashtags"); 
    
  }


}
