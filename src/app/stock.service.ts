import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  api_key: string = "VHK3U5FZN14NIS6L";
  
  constructor(public _http: HttpClient) { }
  
  getStockData(symbol) {
    // return this._http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + this.api_key);
    return this._http.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=" + this.api_key);
  }
  
  
}
