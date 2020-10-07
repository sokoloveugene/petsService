import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {
  public loading$ = new Subject<boolean>();

  loadingStart() {
    this.loading$.next(true);
  }

  loadingEnd() {
    this.loading$.next(false);
  }
}
