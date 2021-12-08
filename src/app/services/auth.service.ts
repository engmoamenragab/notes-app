import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl: string = "https://bsite.net/engmoamenragab/api/Account/";
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken") != null) {
      this.saveCurrrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);
  saveCurrrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currentUser.next(jwtDecode(token));
  }
  signup(signupFormData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}Signup`, signupFormData);
  }
  signin(signinFormData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}Signin`, signinFormData);
  }
  signout() {
    this.currentUser.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(["signin"]);
  }
}
