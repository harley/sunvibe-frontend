import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import  Web3  from '../assets/web3.min';
import { CONTRACT_JSON } from '../assets/tokenApi.js';
import { CONTRACT_ADDRESS } from './contract-address';

declare let window;
@Injectable()
export class UserService {
  private web3Provider: null;
  // private web3accounts;
  private contract;

  web3
  web3accounts

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


    // var result = await this.contract.methods.totalSupply().call({from: this.web3accounts[0]});
    // console.log(result);
    // var total = this.web3.utils.fromWei(result, 'ether');
    // alert("TotaL " + total);

    let balance = 123
    return new Promise((resolve, reject) => {
      return resolve({
        balance: balance,
        total: total
      })
    })
  }

  async buyToken(eth: Number) {
    let account = this.web3accounts[0];
    let wei = this.web3.utils.toWei(eth.toString(), 'ether');
    console.log("buying wei = ", wei)

    var result = await this.web3.eth.sendTransaction(
      {
        from: account,
        to: CONTRACT_ADDRESS,
        value: wei
      }
    );
  }
}