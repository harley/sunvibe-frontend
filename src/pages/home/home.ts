import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonthTransactionsPage } from '../month-transactions/month-transactions';
import { BuyTokenPage } from '../buy-token/buy-token';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: Object
  payoutMode = 'dividend'

  constructor(public navCtrl: NavController, public userService: UserService) {
    this.userData = {
      totalCount: 0,
      dividendTransactions: [],
      tradeTransactions: []
    }
  }

  ionViewDidLoad(){
    // replace with userService to get data
    this.userService.getUserData().subscribe(data => {
      this.userData = data.userData
    })
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
