import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class CoinService {
  constructor(public http: Http){}

  COIN_MARKETCAP_URL = 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=VND&limit=1'

  fetchRate() {
    return this.http.get(this.COIN_MARKETCAP_URL)
      .map((res:any) => res.json());
  }
}