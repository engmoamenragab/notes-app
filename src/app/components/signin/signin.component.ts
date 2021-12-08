import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  error: string = "";
  isClicked: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.currentUser.getValue() != null) {
      this._Router.navigate(["/profile"]);
    }
  }
  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  submitSigninForm(signinForm: FormGroup) {
    this.isClicked = true;
    this._AuthService.signin(signinForm.value).subscribe(
      (response) => {
        if (response.message == "Success") {
          localStorage.setItem("userToken", response.token);
          this._AuthService.saveCurrrentUser();
          this._Router.navigate(["/profile"]);
          this.isClicked = false;
          this.signinForm.reset();
        } else {
          this.error = response.message;
          this.isClicked = false;
          this.signinForm.reset();
        }
      },
      (error) => {},
      () => {},
    );
  }
  ngOnInit(): void {
    $("#signin").particleground();
  }
}
