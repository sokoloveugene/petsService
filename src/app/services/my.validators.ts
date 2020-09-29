import { FormControl } from '@angular/forms';
export class MyValidators {
  static uaPhone(control: FormControl): { [key: string]: boolean } {
    const phoneRegex = /\+380[0-9]{9}$/;
    if (!phoneRegex.test(control.value)) {
      return { uaPhone: true };
    }
    return null;
  }

  static careerYear(control: FormControl): { [key: string]: boolean } {
    const bottomLine = 1900;
    const enteredYear = control.value;
    const today = new Date().getFullYear();
    const yearRegex = /^[0-9]{4}$/;

    if (
      !yearRegex.test(enteredYear) ||
      today < Number(enteredYear) ||
      Number(enteredYear) < bottomLine
    ) {
      return { invalidYear: true };
    }
  }
}
