import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

@NgModule({
  declarations: [AppComponent, ProfileComponent, SigninComponent, SignupComponent, NavbarComponent, NotfoundComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
