import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  error: string = "";
  isClicked: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.currentUser.getValue() != null) {
      this._Router.navigate(["/profile"]);
    }
  }
  signupForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(80)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern("^[A-Z][a-z0-9]{3,8}$")]),
  });
  submitSignupForm(signupForm: FormGroup) {
    this.isClicked = true;
    this._AuthService.signup(signupForm.value).subscribe(
      (response) => {
        if (response.message == "User Registered") {
          this.isClicked = false;
          this.signupForm.reset();
          this._Router.navigate(["/signin"]);
        } else {
          this.isClicked = false;
          this.signupForm.reset();
          this.error = response.errors.email.message;
        }
      },
      (error) => {},
      () => {},
    );
  }
  ngOnInit(): void {
    $("#signup").particleground();
  }
}
