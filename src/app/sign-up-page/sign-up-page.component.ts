import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { SignUpService } from '../services/sign-up.service';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private signUp: SignUpService,
    private router: Router,
    private auth: AuthService,
    private alertServise: AlertService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.router.navigate(['/']);
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', Validators.required),
    });
  }

  submit() {
    let errorText: string;
    switch (true) {
      case Boolean(this.form.controls.email.errors):
        if (this.form.controls.email.errors.required) {
          errorText = 'Email is required';
        } else if (this.form.controls.email.errors.email) {
          errorText = 'Email is not valid';
        }
        break;

      case Boolean(this.form.controls.password.errors):
        if (this.form.controls.password.errors.required) {
          errorText = 'Password is required';
        } else if (this.form.controls.password.errors.minlength) {
          errorText = `Password length need to be at least ${this.form.controls.password.errors.minlength.requiredLength}`;
        }
        break;

      case Boolean(this.form.controls.passwordConfirm.errors):
        if (this.form.controls.passwordConfirm.errors.required) {
          errorText = 'Password confirmation is required';
        }
        break;

      case this.form.controls.password.value !==
        this.form.controls.passwordConfirm.value:
        errorText = 'Password confirmation error';
        break;
    }

    if (errorText) {
      this.alertServise.error(errorText);
      return;
    }

    if (
      this.form.controls.password.value !==
      this.form.controls.passwordConfirm.value
    )
      return;

      
    const {email, password} = this.form.value;

    this.signUp.signUp({email, password});
    this.form.reset();
  }
}
