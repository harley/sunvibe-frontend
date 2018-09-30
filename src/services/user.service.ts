import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import  Web3  from '../assets/web3.min';
import { CONTRACT_JSON } from '../assets/tokenApi.js';
import { CONTRACT_ADDRESS } from './contract-address';

declare let window;
@Injectable()
export class UserService {
  private contract;

  web3
  web3accounts
  transactionHash

  constructor(public http: Http){
    this.web3 = new Web3(window.web3.currentProvider);
    this.contract = new this.web3.eth.Contract(CONTRACT_JSON, CONTRACT_ADDRESS);
    // console.log('provider: ', window.web3.currentProvider);
    // console.log('contract json', CONTRACT_JSON)
    // console.log('contract address', CONTRACT_ADDRESS)

    console.log(this.contract);
  }

  getUserData() {
    return this.http.get("./assets/user.json")
      .map((res:any) => res.json());
  }

  async totalSupply(){
    let web3accounts = await this.web3.eth.getAccounts();
    this.web3accounts = web3accounts;
    console.log(web3accounts);
    let balance

    for(let i=0; i < web3accounts.length; i++) {
      //get balance of each account
      this.web3.eth.getBalance(web3accounts[i]).then(balance => {
        balance = this.web3.utils.fromWei(balance);
        console.log("Account " + i + "(" + web3accounts[i] + ") has " + balance + " ethers");
      });
    }

    var result = await this.contract.methods.totalSupply().call({from: web3accounts[0]});
    console.log(result);
    var total = this.web3.utils.fromWei(result, 'ether');

    return new Promise((resolve, reject) => {
      return resolve({
        balance: balance,
        total: total
      })
    })
  }

  async buyToken(eth: string, tokenAmount: number) {
    let account = this.web3accounts[0];
    let wei = this.web3.utils.toWei(eth, 'ether');
    console.log("buying wei = ", wei)

    this.web3.eth.sendTransaction(
      {
        from: account,
        to: CONTRACT_ADDRESS,
        value: wei
      }, (err, transactionHash) => {
        if (err) {
            console.log('error', err);
        } else {
          console.log('transactionHash: ', transactionHash);
          // post to API

          let headers = new Headers( { 'Content-Type' : 'application/json' });
          let options = new RequestOptions({ headers: headers });

          let data = JSON.stringify({
            transaction_hash: transactionHash,
            token_amount: tokenAmount
          });

          const PURCHASE_URL = "https://sunvibe-dashboard.herokuapp.com/api/v1/purchases"
          this.http.post(`${PURCHASE_URL}?transaction_hash=${transactionHash}&token_amount=${tokenAmount}`, data, options)
            .toPromise()
            .then(response => {
              console.log("API response", response.json());
            }).catch(error => {
              console.log(error.status);
            });

          return new Promise((resolve, _) => {
            return resolve({transactionHash: transactionHash});
          })
        }
    });
  }
}