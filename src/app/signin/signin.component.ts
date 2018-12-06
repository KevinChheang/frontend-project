import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

import { Router } from '@angular/router';

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

  constructor(public _api: UserService, private router: Router) { }
  
  signIn() {
    this._api.checkUser(this.userCredentials)
    .subscribe(
        (res:any) => {
          console.log("Login is successful", res);
          window.sessionStorage.setItem("token", res.token);
          window.sessionStorage.setItem("userId", res.userId);
          this.router.navigate([`/dashboard`]);
          this.onGetUser();
        });
  }
  
  onGetUser() {
    this._api.getUser(window.sessionStorage.userId, window.sessionStorage.token)
    .subscribe((res: any) => {
      console.log(res.firstName);
      this._api.firstName = res.firstName;
    });
  }

  ngOnInit() {
  }

}
