import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  api_key: string = "VHK3U5FZN14NIS6L";
  
  // firstName: string = "Tester";
  // lastName: string = "Test";
  // email: string = "test@testing.com";
  // password: string = "testing";
  
  constructor(public _http: HttpClient) { }
  
  getStockData(symbol) {
    // return this._http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + this.api_key);
    return this._http.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=" + this.api_key);
  }
  
  postUserInfo(firstName, lastName="Shane", email, password) {
    return this._http.post("http://meanstack-2018-5-viramint-phortonssf.c9users.io:8080/api/AppUsers",
      {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
      });
  }
  
    // this.httpClient.post("http://127.0.0.1:3000/customers",
    //     {
    //         "name": "Customer004",
    //         "email": "customer004@email.com",
    //         "tel": "0000252525"
    //     })
    //     .subscribe(
    //         data => {
    //             console.log("POST Request is successful ", data);
    //         },
    //         error => {
    //             console.log("Error", error);
    //         }
    //     ); 
  
}
