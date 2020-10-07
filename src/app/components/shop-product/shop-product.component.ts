import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { shopItemInterface } from '../../../interfaces';
@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.scss'],
})
export class ShopProductComponent {
  @Input() item: shopItemInterface;
  @Input() previewMode: boolean;
  @Output() signalToUpdate: EventEmitter<void> = new EventEmitter();
  
  liked = false;
  amount = 1;
  sum: number;

  constructor(private alert: AlertService) {}

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

      switch (true) {
        case cart === null:
          localStorage.setItem(
            'cart',
            JSON.stringify({ [this.item.itemId]: this.amount })
          );
          break;

        case cart.hasOwnProperty(this.item.itemId):
          localStorage.setItem(
            'cart',
            JSON.stringify({
              ...cart,
              [this.item.itemId]: cart[this.item.itemId] + this.amount,
            })
          );
          break;

        default:
          localStorage.setItem(
            'cart',
            JSON.stringify({ ...cart, [this.item.itemId]: this.amount })
          );
      }

      this.signalToUpdate.emit();

      this.item.available = this.item.available - this.amount;
    } catch {
      console.warn;
      localStorage.clear();
    }

    this.amount = 1;
  }

  like() {
    this.liked = !this.liked;
    console.log(this.item.name, 'like');
  }
}
