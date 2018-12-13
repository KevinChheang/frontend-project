import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url: string = "http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers/";
  
  firstName = "";

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
  
  getUser(userId, token) {
    return this._http.get(this.base_url + userId + "?access_token=" + token);
  }
  
  //Api calls to save favorite stock
  saveFav(userId, token, fav) {
    return this._http.post("http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers/" + userId + "/StockFavs?access_token=" + token, fav)
  }
  
  getFav(userId, token) {
    return this._http.get("http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers/" + userId + "/StockFavs?access_token=" + token);
  }
  
  deleteFav(userId, token) {
    return this._http.delete("http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers/" + userId + "/StockFavs?access_token=" + token);
  }
}
