import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  constructor(public http: Http){}

  getUserData() {
    return this.http.get("./assets/user.json")
      .map((res:any) => res.json());
  }

  buyToken(count: Number) {
    //
  }
}