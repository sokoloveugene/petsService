import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cartItem } from 'src/interfaces';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item: cartItem;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<string> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
}
