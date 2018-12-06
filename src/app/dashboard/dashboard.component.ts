import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName = "";
  results: any;
  rate: any;
  amount: number;
  symbol = "";
  from_symbol = "USD";
  to_symbol = ["EUR", "NZD", "GBP", "KHR", "THB"];
  
  symbolResult: any;
  
  constructor(public _apiStock: StockService, public _apiUser: UserService, private router: Router) {
    this.firstName = this._apiUser.firstName;
    console.log("first name:" + this.firstName);
  }
  
  onGetExchangeRate() {
    this._apiStock.getExchangeRate(this.from_symbol, this.to_symbol[0])
    .subscribe(
      (res: any) => {
          this.results = res;
          // this.rate = this.results["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          console.log(this.results);
          // console.log(this.results["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
        }
      )
  }
  
  onLogOut() {
    this._apiUser.logOut(window.sessionStorage.token)
    .subscribe((res: any) => {
      console.log("Logout successful!");
      window.sessionStorage.clear();
      this.router.navigate([`/signin`]);
    })
  }
  
  onSearchSymbol() {
    this._apiStock.searchStock(this.symbol)
    .subscribe((res: any) => {
      this.symbolResult = res;
      // console.log(this.symbolResult);
      // console.log(this.symbolResult.bestMatches);
      // console.log(this.symbolResult.bestMatches[0]);
      // console.log(this.symbolResult.bestMatches[0]["1. symbol"]);
      }
    )
  }
  
  /////////////////////////
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Equity 1'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series 2'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  ////////////////////////////////////

  ngOnInit() {
  }

}
