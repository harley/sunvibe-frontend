import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import  Web3  from 'web3';
import tokenAbi from './tokenAbi.json';
import * as TruffleContract from 'truffle-contract';
import CONTRACT_ADDRESS  from './contract-address';
// declare let require: any;
declare let window;
@Injectable()
export class UserService {
  private web3Provider: null;
  // private web3accounts;
  private contract;

  constructor(public http: Http){
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
      } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8100');
      }
      window.web3 = new Web3(this.web3Provider);
      this.contract = new window.web3.eth.contract(tokenAbi, CONTRACT_ADDRESS);
      console.log(this.contract);
  }

  getUserData() {
    return this.http.get("./assets/user.json")
      .map((res:any) => res.json());
  }
  async getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
          window.web3.eth.getBalance(account, function (err, balance) {
            if (err === null) {
              return resolve({
                fromAccount: account,
                balance: window.web3.fromWei(balance.toNumber(), 'tether')
              });
            } else {
              return reject('error!');
            }
          });
        }
      });
    });
  }

  transferEther(
    _transferFrom,
    _transferTo,
    _amount,
    _remarks
  ) {
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.deployed().then(function (instance) {
        return instance.transferFund(
          _transferTo, {
            from: _transferFrom,
            value: window.web3.utils.fromWei(_amount, 'ether')
          });
      }).then(function (status) {
        if (status) {
          return resolve({
            status: true
          });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Error in transferEther service call');
      });
    });
  }
}