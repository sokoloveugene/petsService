import { Component, Input } from '@angular/core';
import { shopItemInterface } from '../../../interfaces';
@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.scss'],
})
export class ShopProductComponent {
  @Input() item: shopItemInterface;
  @Input() previewMode: boolean;

  liked = false;
  amount = 1;
  sum: number;

  increase() {
    if (this.amount < this.item.available) {
      this.amount = this.amount + 1;
      this.sum = Number((this.item.price * this.amount).toFixed(2));
    }
    return;
  }

  decrease() {
    if (this.amount > 1) {
      this.amount = this.amount - 1;
      this.sum = Math.floor(this.item.price * this.amount * 100) / 100;
    }
    return;
  }

  buy() {
    try {
      const cart: { [key: string]: number } = JSON.parse(
        localStorage.getItem('cart')
      );

      if (cart === null) {
        localStorage.setItem(
          'cart',
          JSON.stringify({ [this.item.itemId]: this.amount })
        );
      } else if (cart.hasOwnProperty(this.item.itemId)) {
        localStorage.setItem(
          'cart',
          JSON.stringify({
            ...cart,
            [this.item.itemId]: cart[this.item.itemId] + this.amount,
          })
        );
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify({ ...cart, [this.item.itemId]: this.amount })
        );
      }
    } catch {
      console.warn;
      localStorage.clear();
    }
  }

  like() {
    this.liked = !this.liked;
    console.log(this.item.name, 'like');
  }
}
