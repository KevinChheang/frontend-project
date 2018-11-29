import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  constructor(public _api: StockService) {}
  
  onPostUserInfo() {
    this._api.postUserInfo(this.firstName, this.lastName, this.email, this.password)
    .subscribe(
        data => {
          console.log("POST request is successful", data);
        });
  }
  

  ngOnInit() {
  }

}
