import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url: string = "http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers";

  constructor(public _http: HttpClient) { }
  
  postUserInfo(user) {
    return this._http.post(this.base_url, user);
  }
  
  checkUser(userCredentials) {
    return this._http.post(this.base_url + "/login", userCredentials);
  }
  
  logOut(token) {
    return this._http.post(this.base_url + "/logout?access_token=" + token, {});
  }
}
