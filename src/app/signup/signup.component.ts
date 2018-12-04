import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  constructor(public _api: UserService) {}
  
  onPostUserInfo() {
    this._api.postUserInfo(this.user)
    .subscribe(
        (data:any) => {
          console.log("POST request is successful", data);
          window.sessionStorage.setItem("token", data.token);
          window.sessionStorage.setItem("userId", data.userId);
        });
  }
  

  ngOnInit() {
  }

}
