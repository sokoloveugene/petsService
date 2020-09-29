import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/services/shop.service';
import { shopItemInterface } from 'src/interfaces';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  items: shopItemInterface[];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.sub = this.shopService
      .getAllItems()
      .subscribe((data) => (this.items = data));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
