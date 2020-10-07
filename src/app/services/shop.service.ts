import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { shopItemInterface } from '../../interfaces';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  createShopItem(body: shopItemInterface) {
    return this.http.post(
      `https://${environment.projectId}.firebaseio.com/shop.json`,
      JSON.stringify(body)
    );
  }

  getAllItems() {
    return this.http
      .get(`https://${environment.projectId}.firebaseio.com/shop.json`)
      .pipe(
        map((res) => {
          return Object.keys(res).map((key) => ({
            ...res[key],
            itemId: key,
          }));
        })
      );
  }
}
