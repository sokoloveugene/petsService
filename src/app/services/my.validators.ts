import { FormControl } from '@angular/forms';
export class MyValidators {
  static uaPhone(control: FormControl): { [key: string]: boolean } {
    const regex = /\+380[0-9]{9}$/;
    if (!regex.test(control.value)) {
      return { uaPhone: true };
    }
    return null;
  }
}
