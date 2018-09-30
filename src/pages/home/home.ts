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
  tokenCount = 0

  constructor(public navCtrl: NavController, public userService: UserService) {
    this.userData = {
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

    this.userService.getPurchases().subscribe(data => {
      console.log('all purchases', data)
      this.tokenCount = data.map(e => e.token_amount).reduce((a, b) => a + b, 0);
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
