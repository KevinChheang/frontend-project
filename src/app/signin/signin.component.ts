import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  email: string = "";
  password: string = "";
  userCredentials = {
        email: "",
        password: ""
      }

  constructor(public _api: UserService) { }
  
  onCheckUser() {
    this._api.checkUser(this.userCredentials)
    .subscribe(
        (data:any) => {
          console.log("Login is successful", data);
          window.sessionStorage.setItem("token", data.token);
          window.sessionStorage.setItem("userId", data.userId);
        });
  }
  
  

  ngOnInit() {
  }

}
