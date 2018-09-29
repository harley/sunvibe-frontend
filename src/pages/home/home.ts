import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonthTransactionsPage } from '../month-transactions/month-transactions';
import { BuyTokenPage } from '../buy-token/buy-token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: Object

  fakeTransactions = [
    { month: 'August', amount: '10K' },
    { month: 'July', amount: '9K' }
  ]

  constructor(public navCtrl: NavController) {
    this.userData = {
      totalCount: 0,
      transactions: []
    }
  }

  ionViewDidLoad(){
    // replace with userService to get data
    this.userData = {
      tokenCount: 10123,
      transactions: this.fakeTransactions
    }
  }

  itemSelected(item) {
    this.navCtrl.push(MonthTransactionsPage, {
      item: item
    });
  }

  buyTokenSelected(event) {
    this.navCtrl.push(BuyTokenPage);
  }
}
