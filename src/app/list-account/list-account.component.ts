import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../Services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent {
  accounts :  any[] = [];
  filteredAccounts: any[] = [];
  accountsAll :any [] = [];

  searchText: string = '';
  addForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private customerService:CustomerService,private router:Router) {
  }
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers(): void {
    this.customerService.getAllAccounts().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Accounts:', response);
        this.accounts=response;
        this.accountsAll=response;
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching Accounts:', error);
      }
    );
  }

  onDetails(id: any) {


    this.router.navigate([`/details-account/${id}`]);

  }

  onSearch(): void {

    this.accounts = this.accountsAll;
    console.log(this.searchText.toLowerCase());
    console.log("hello");


    const searchTextLower = this.searchText.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account => {
      return account.title.toLowerCase().includes(searchTextLower) ||
        account.category.toLowerCase().includes(searchTextLower) ||
        account.workingBalance.toString().toLowerCase().includes(searchTextLower) ||
        account.openingDate.toLowerCase().includes(searchTextLower) ||
        account.closureDate.toLowerCase().includes(searchTextLower) ||
        account.officer.name.toLowerCase().includes(searchTextLower) ||
        account.currency.name.toLowerCase().includes(searchTextLower) ||
        account.customer.name.toLowerCase().includes(searchTextLower);
    });

    this.accounts=this.filteredAccounts;
  }
}
