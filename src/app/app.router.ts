import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

export const ROUTES: Routes = [
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "dashboard", component: DashboardComponent}
];

export const ROUTER: ModuleWithProviders = RouterModule.forRoot(ROUTES);