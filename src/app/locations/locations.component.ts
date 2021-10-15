import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Input() location: string = "";

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
            this._myService.getLocation(this.id).subscribe(
                data => { 
                    //read data and assign to private variable hashtag
                    this.students = data;
                    //populate the hashtag on the page
                    //notice that this is done through the two-way bindings
                    this.location = this.students.location;
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
    this.getLocations();
}
  locations = new FormControl('');

  onSubmit(){
    console.log("You submitted: "  + this.location);
    //this._myService.addLocations(this.location);
    if (this.mode == 'Add')
      this._myService.addLocations(this.location);
    if (this.mode == 'Edit')
      this._myService.updateLocation(this.id,this.location);
    location.reload();
  }

  //method called OnInit
  getLocations() {
      this._myService.getLocations().subscribe(
          //read data and assign to public variable students
          data => { this.students = data},
          err => console.error(err),
          () => console.log('finished loading')
      );
  }

  onDelete(locationId: string) {
    this._myService.deleteLocation(locationId);
  }


}