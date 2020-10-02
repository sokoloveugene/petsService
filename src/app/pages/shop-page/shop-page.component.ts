import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop.service';
import { shopItemInterface, animalTypes, categoryTypes } from 'src/interfaces';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit, OnDestroy {
  filtersVisible = false;

  sub: Subscription;
  items: shopItemInterface[];
  search = '';
  animalFilters: Array<animalTypes> = [];
  categoryFilters: Array<categoryTypes> = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.sub = this.shopService
      .getAllItems()
      .pipe(
        map((products: shopItemInterface[]) => {
          try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart);
            if (cart) {
              return products.map((product) => {
                if (cart.hasOwnProperty(product.itemId)) {
                  return {
                    ...product,
                    available: product['available'] - cart[product.itemId],
                  };
                } else {
                  return product;
                }
              });
            }
          } catch {
            localStorage.removeItem('cart');
          }

          return products;
        })
      )
      .subscribe((data) => (this.items = data));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  selectAnimalType(e) {
    e.target.checked
      ? (this.animalFilters = [...this.animalFilters, e.target.value])
      : (this.animalFilters = this.animalFilters.filter(
          (animal) => animal !== e.target.value
        ));
  }

  selectCategory(e) {
    e.target.checked
      ? (this.categoryFilters = [...this.categoryFilters, e.target.value])
      : (this.categoryFilters = this.categoryFilters.filter(
          (category) => category !== e.target.value
        ));
  }

  toggleFilterVisibility() {
    if (this.filtersVisible) {
      this.animalFilters = [];
      this.categoryFilters = [];
    }
    this.filtersVisible = !this.filtersVisible;
  }
}
