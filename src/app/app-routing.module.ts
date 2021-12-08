import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
