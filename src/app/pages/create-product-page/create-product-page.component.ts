import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { shopItemInterface } from '../../../interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss'],
})
export class CreateProductPageComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      url: new FormControl(''),
      name: new FormControl('', Validators.required),
      details: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      price: new FormControl('', [Validators.required, Validators.max(1e6)]),
      category: new FormControl('', Validators.required),
      animal: new FormControl('', Validators.required),
      available: new FormControl('', [
        Validators.required,
        Validators.max(9e3),
      ]),
    });
  }

  submit() {
    if (this.form.invalid) return;

    const body: shopItemInterface = {
      ...this.form.value,
      id: this.auth.userId(),
    };

    this.shopService.createShopItem(body).subscribe(
      () => this.alert.success('Success'),
      (err) => console.warn(err)
    );

    this.router.navigate(['/']);
  }
}
