import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../Services/customer.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit{

  customers :  any[] = [];
  customersAll :  any[] = [];
  filteredCustomers: any[] = [];
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
    this.customerService.getCustomers().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Customers:', response);
        this.customers=response;
        this.customersAll=response;
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching customers:', error);
      }
    );
  }

  onDetails(id: any) {


    this.router.navigate([`/details-customer/${id}`]);

  }

  onSearch(): void {
    this.customers=this.customersAll;




    const searchTextLower = this.searchText.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer => {
      return customer.name.toLowerCase().includes(searchTextLower) ||
        customer.type.toLowerCase().includes(searchTextLower) ||
        customer.gender.toLowerCase().includes(searchTextLower) ||
        customer.dateBirthCreation.toLowerCase().includes(searchTextLower) ||
        customer.address.toLowerCase().includes(searchTextLower) ||
        customer.legalDocName.toLowerCase().includes(searchTextLower) ||
        customer.legalId.toLowerCase().includes(searchTextLower) ||
        customer.country.name.toLowerCase().includes(searchTextLower) ||
        customer.officer.name.toLowerCase().includes(searchTextLower) ||
        customer.tel.toLowerCase().includes(searchTextLower) ||
        customer.mail.toLowerCase().includes(searchTextLower);
    });
    this.customers=this.filteredCustomers;
  }
}
