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
  // firstName = "";
  results: any; // store favorites
  symbol = "";
  stock_closed = [];
  
  label = {
    name: ""
  };
  
  stock_favorite = [];
  
  
  isGetStock = false;
  
  symbolResult: any;
  
  constructor(public _apiStock: StockService, public _apiUser: UserService, private router: Router) {
    // this.firstName = this._apiUser.firstName;
    // console.log("first name:" + this.firstName);
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
      // this.label = res["bestMatches"]["1. symbol"];
      // console.log(res);
      }
    )
  }
  
  onSaveFav() {
    this._apiUser.saveFav(window.sessionStorage.userId, window.sessionStorage.token, this.label)
    .subscribe((res: any) => {
      console.log("Saved favorite successful!");
      console.log("Res inside save", res);
      this.stock_favorite.push(this.symbol);
      // console.log(this.stock_favorite);
      for(let i = 0; i < res.length; i++) {
        
      }
      this.onGetFav();
    });
  }
  
  onGetFav() {
    this._apiUser.getFav(window.sessionStorage.userId, window.sessionStorage.token)
    .subscribe((res: any) => {
      this.results = Object.entries(res);
    });
  }
  
  onGetStockInfo () {
    this._apiStock.getStockInfo(this.symbol)//this.label.name = this.getLabel())
      .subscribe((res:any) => {
        this.isGetStock = true;
        
        // console.log(res);
        // console.log(res["Monthly Time Series"]);
        
        // let dates = Object.keys(res["Monthly Time Series"])
        // // console.log(dates);
        
        // let dates_format = [];
        
        // if(dates_format.length !== 0) {
        //   dates_format = [];
        // }
        
        // for(let i = 0; ; i++) {
        //   if(i === 12) {
        //     break;
        //   }
        //   dates_format.push(dates[i]);
        // }
        // this.lineChartLabels = dates_format;
        // console.log(dates_format);
        
        this.label.name = this.symbol;
        
        // get all the items at "Monthly Time Series"
        let equity = Object.entries(res["Monthly Time Series"]);
        // console.log(res);
        // filter out for 12 months
        let equity_closed = equity.filter(e => e >= "2018-01-01" && e <= "2018-12-31");
        // console.log(equity_closed);
        
        if(this.stock_closed.length !== 0) {
          this.stock_closed = [];
        }
        
        for(let i = 0; i < equity_closed.length; i++) {
          this.stock_closed.push(equity_closed[i]["1"]["4. close"]);
        }
        console.log(this.stock_closed);
        
        this.lineChartData = [{data: this.stock_closed, label: this.symbol}];
      });
  }
  
  onDeleteFav() {
    this._apiUser.deleteFav(window.sessionStorage.userId, window.sessionStorage.token)
    .subscribe((res: any) => {
      this.stock_favorite = [];
      console.log("Delete fave successful!")
    });
  }
  
  /////////////////////////
  // lineChart
  public lineChartData:Array<any> = [
    {data: this.stock_closed, label: ''}//,
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'MSFT'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'];
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
