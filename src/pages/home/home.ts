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
  totalTokenCount = 0

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
    this.userService.totalSupply().then(data => {
      console.log('total supply', data);
    });
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
