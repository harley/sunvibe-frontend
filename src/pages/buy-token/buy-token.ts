import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CoinService } from '../../services/coin.service';
import { UserService } from '../../services/user.service';

/**
 * Generated class for the BuyTokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-buy-token',
  templateUrl: 'buy-token.html',
})
export class BuyTokenPage {
  tokenAmount = 0
  unitPrice = 70 // make it dynamic
  quotes = {
    VND: {
      price: 1
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public coinService: CoinService, public userService: UserService) {
  }

  ionViewDidLoad() {

    this.coinService.fetchRate().subscribe(data => {
      this.quotes = data.data.quotes
    })
  }

  async confirmBuy() {
    // alert(`Confirm buying ${this.tokenAmount} for ${this.totalPrice()}?`);
    let totalPrice = this.totalPriceEth();
    if (totalPrice > 0) {
      this.userService.buyToken(totalPrice.toFixed(6), this.tokenAmount);
    } else {
      alert("Amount > 0 please")
    }

    this.navCtrl.pop();
  }

  totalPrice() {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });

    return formatter.format(this.tokenAmount * this.unitPrice);
  }

  totalPriceEth() {
    return (this.tokenAmount * this.unitPrice / this.quotes.VND.price);
  }
}
