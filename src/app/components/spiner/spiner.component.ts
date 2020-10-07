import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {SpinerService} from "../../services/spiner.service";

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit, OnDestroy {
  sub: Subscription;
  visibility: boolean;

  constructor(private spiner: SpinerService ) { }


  ngOnInit(): void {
    this.sub = this.spiner.loading$.subscribe(state => this.visibility = state)
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

}
