import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonthTransactionsPage } from '../month-transactions/month-transactions';
import { BuyTokenPage } from '../buy-token/buy-token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [
    { month: 'August', amount: '10K' },
    { month: 'July', amount: '9K' }
  ]

  constructor(public navCtrl: NavController) {
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
