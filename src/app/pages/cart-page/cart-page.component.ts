import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { MyValidators } from 'src/app/services/my.validators';
import { ShopService } from 'src/app/services/shop.service';
import { SpinerService } from 'src/app/services/spiner.service';
import { cartItem, shopItemInterface } from 'src/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cartItems: any[] = [];
  cart: { [key: string]: number }[];
  total: number;
  form: FormGroup;

  constructor(
    private shopService: ShopService,
    private router: Router,
    private alert: AlertService,
    private spiner: SpinerService
  ) {}

  ngOnInit(): void {
    this.spiner.loadingStart();
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
          .subscribe(
            (data) => {
              if (data) {
                this.cartItems = data;
                this.updateTotal();
              }
            },
            null,
            () => this.spiner.loadingEnd()
          );
      } else {
        this.spiner.loadingEnd();
      }
    } catch {
      console.warn;
    }

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      delivery: new FormControl('', Validators.required),
      payment: new FormControl('', Validators.required),
      address: new FormControl(''),
      phone: new FormControl('+380', [
        Validators.required,
        MyValidators.uaPhone,
      ]),
      comments: new FormControl(''),
    });
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

  submit() {
    if (this.form.invalid) return;
    if (
      this.form.controls.delivery.value === 'courier' &&
      this.form.controls.address.value === ''
    )
      return;

    const order = {
      ...this.form.value,
      cart: this.getCart(),
      timeStamp: Date.now(),
    };

    this.setCart(null);
    this.router.navigate(['/']);
    this.alert.success('You order was sent');

    console.log(order);
  }
}
