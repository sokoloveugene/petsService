import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FreezeScrollService {
  freeze() {
    const clientWidthBeforeFreeze = document.body.clientWidth;

    document.body.style.overflow = 'hidden';

    const clientWidthAfterFreeze = document.body.clientWidth;

    if (clientWidthBeforeFreeze !== clientWidthAfterFreeze) {
      document.body.style.paddingRight = (
        clientWidthBeforeFreeze - clientWidthAfterFreeze
      ).toString();
    }
  }

  unfreeze() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
