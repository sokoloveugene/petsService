import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  breakpoint = 768;

  windowWiderBreakPoint() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(80),
      map((e) => e.target['innerWidth'] < this.breakpoint)
    );
  }
}
