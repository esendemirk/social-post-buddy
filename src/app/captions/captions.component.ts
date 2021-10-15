import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-captions',
  templateUrl: './captions.component.html',
  styleUrls: ['./captions.component.css']
})
export class CaptionsComponent implements OnInit {

  @Input() caption: string = "";

  //declare variable to hold response and make it public to be accessible from components.html
  public students: any;
  public mode = 'Add'; //default mode
  private student: any;
  private id: any; //student ID
  //initialize the call using StudentService 
  constructor(private _myService: StudentService, public route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id')){
            this.mode = 'Edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');

             //request student info based on the id
            this._myService.getCaption(this.id).subscribe(
                data => { 
                    //read data and assign to private variable caption
                    this.students = data;
                    //populate the firstName and lastName on the page
                    //notice that this is done through the two-way bindings
                    this.caption = this.students.caption;
                },
                err => console.error(err),
                () => console.log('finished loading')
            );
        } 
        else {
            this.mode = 'Add';
            this.id = null; 
        }
    });
    this.getCaptions();
}
  captions = new FormControl('');

  onSubmit(){
    console.log("You submitted: "  + this.caption);
    //this._myService.addCaptions(this.caption);
    if (this.mode == 'Add')
      this._myService.addCaptions(this.caption);
    if (this.mode == 'Edit')
      this._myService.updateCaption(this.id,this.caption);
    location.reload();
  }

  //method called OnInit
  getCaptions() {
      this._myService.getCaptions().subscribe(
          //read data and assign to public variable students
          data => { this.students = data},
          err => console.error(err),
          () => console.log('finished loading')
      );
  }

  onDelete(captionId: string) {
    this._myService.deleteCaption(captionId);
  }

}
