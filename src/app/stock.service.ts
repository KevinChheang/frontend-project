import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  base_url: string = "https://www.alphavantage.co/query?";
  api_key: string = "VHK3U5FZN14NIS6L";
  
  constructor(public _http: HttpClient) { }
  
  
  // Api calls for exchange rate
  // getExchangeRate(from_symbol, to_symbol) {
  //   // for(let i = 0; i < to_symbol.length; i++) {
  //     return this._http.get(this.base_url + "function=FX_DAILY&from_symbol=" + from_symbol + "&to_symbol=" + to_symbol + "&apikey=" + this.api_key);
  //   // }
  // }
  
  // Api calls for stock search
  searchStock(symbol) {
    return this._http.get(this.base_url + "function=SYMBOL_SEARCH&keywords=" + symbol + "&apikey=" + this.api_key);
  }
  
  // Api calls for stock information
  getStockInfo(symbol="goog") {
    return this._http.get(this.base_url + "function=TIME_SERIES_MONTHLY&symbol=" + symbol + "&apikey=" + this.api_key);
  }
}
