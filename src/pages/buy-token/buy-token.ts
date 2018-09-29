import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CoinService } from '../../services/coin.service';

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
  unitPrice = 700 // make it dynamic
  quotes = {
    VND: {
      price: 1
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public coinService: CoinService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyTokenPage');

    this.coinService.fetchRate().subscribe(data => {
      this.quotes = data.data.quotes
    })
  }

  confirmBuy() {
    alert(`Confirm buying ${this.tokenAmount} for ${this.totalPrice()}?`);
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
    console.log(this.quotes);
    return (this.tokenAmount * this.unitPrice / this.quotes.VND.price);
  }
}
