import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {AddCustomerComponent} from "./add-customer/add-customer.component";
import {DetailsCustomerComponent} from "./details-customer/details-customer.component";
import {ListAccountComponent} from "./list-account/list-account.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {DetailsAccountComponent} from "./details-account/details-account.component";
//import { AdherentlistComponent } from './adherentlist/adherentlist.component';
//import {AdherentaddComponent} from "./adherentadd/adherentadd.component";
//import {AddEmployeComponent} from "./add-employe/add-employe.component";
//import {ListEmployeComponent} from "./list-employe/list-employe.component";
//import {DetailsAdherentComponent} from "./details-adherent/details-adherent.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-account', component: AddAccountComponent },
   { path: 'list-account', component: ListAccountComponent },
   {path : 'details-customer/:idCustomer' , component : DetailsCustomerComponent},
  {path : 'details-account/:idAccount' , component : DetailsAccountComponent},


  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no path specified
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
