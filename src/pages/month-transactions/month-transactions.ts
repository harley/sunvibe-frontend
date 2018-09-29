import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'month-transactions',
  templateUrl: 'month-transactions.html'
})
export class MonthTransactionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item =this.navParams.get('item')
  }

}
