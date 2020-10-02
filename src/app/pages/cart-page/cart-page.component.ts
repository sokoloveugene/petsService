import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop.service';
import { cartItem, shopItemInterface } from 'src/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cartItems: any[];
  cart: { [key: string]: number }[];
  total: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    try {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart) {
        this.sub = this.shopService
          .getAllItems()
          .pipe(
            map((response) => {
              return response
                .filter((product: shopItemInterface) =>
                  this.cart.hasOwnProperty(product.itemId)
                )
                .map((product) => {
                  const amount = this.cart[product.itemId];
                  return { ...product, amount: this.cart[product['itemId']] };
                });
            })
          )
          .subscribe((data) => {
            this.cartItems = data;
            this.updateTotal();
          });
      }
    } catch {
      console.warn;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  updateTotal() {
    const rowTotal = this.cartItems.reduce(
      (acc: number, cartItem: cartItem) => {
        return acc + cartItem['price'] * cartItem['amount'];
      },
      0
    );
    this.total = Number(rowTotal.toFixed(2));
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  setCart(updatedCart: { [key: string]: number }) {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  findItemInCartById(id: string) {
    return this.cartItems.find((item) => item['itemId'] === id);
  }

  addMore(id: string) {
    const itemCart = this.findItemInCartById(id);

    if (itemCart && itemCart['amount'] < itemCart['available']) {
      try {
        const cart = this.getCart();
        cart[id] = cart[id] + 1;
        itemCart['amount'] = itemCart['amount'] + 1;
        this.setCart(cart);
        this.updateTotal();
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }

  addLess(id: string) {
    const itemCart = this.findItemInCartById(id);

    if (itemCart && itemCart['amount'] > 1) {
      try {
        const cart = this.getCart();
        cart[id] = cart[id] - 1;
        itemCart['amount'] = itemCart['amount'] - 1;
        this.setCart(cart);
        this.updateTotal();
      } catch {
        localStorage.removeItem('cart');
      }
    } else if (itemCart && itemCart['amount'] === 1) {
      this.deleteFromCart(id);
    }
  }

  deleteFromCart(id: string) {
    try {
      const cart = this.getCart();
      delete cart[id];
      this.setCart(cart);
      this.cartItems = this.cartItems.filter((item) => item['itemId'] !== id);
      this.updateTotal();
    } catch {
      localStorage.removeItem('cart');
    }
  }
}
