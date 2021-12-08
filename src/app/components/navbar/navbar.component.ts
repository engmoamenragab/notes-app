import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isSignin: boolean = false;
  userDetails: any;
  userName: string = "";
  constructor(private _AuthService: AuthService) {}
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() != null) {
        this.userDetails = this._AuthService.currentUser.getValue();
        this.isSignin = true;
        this.userName = this.userDetails.name;
      } else {
        this.isSignin = false;
      }
    });
  }
  isSignout() {
    this._AuthService.signout();
  }
}
