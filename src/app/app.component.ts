import { Component } from '@angular/core';

import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results: any;
  rate: any;
  amount: number;
  symbol = "";
  
  constructor(public _api: StockService) {}
  
  onGetStockData() {
    this._api.getStockData(this.symbol)
    .subscribe(
      (res: any) => {
          this.results = res;
          this.rate = this.results["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          console.log(this.results);
          console.log(this.results["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        }
      )
  }
  
  convertRate() {
    return this.amount * this.rate;
  }
}
