import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { NavbarComponent } from './navbar/navbar.component';
import { NavbartopComponent } from './navbartop/navbartop.component';
import { LogoutComponent } from './logout/logout.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DetailsCustomerComponent } from './details-customer/details-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DetailsAccountComponent } from './details-account/details-account.component';
import { ListAccountComponent } from './list-account/list-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NavbartopComponent,
    LogoutComponent,
    ListCustomerComponent,
    DetailsCustomerComponent,
    AddCustomerComponent,
    AddAccountComponent,
    DetailsAccountComponent,
    ListAccountComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule, // Import AppRoutingModule here
      ReactiveFormsModule,
      FormsModule, // Add FormsModule here
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
