import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../Services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit{
  currencies : any;
  customers : any;
  officer : any;

  AccountForm = new FormGroup({


    title: new FormControl(''),
    openingDate: new FormControl(''),
    closureDate: new FormControl(''),
    workingBalance: new FormControl(0),
    category: new FormControl('CHEQUE'),
    officer: new FormControl(''),
    customer: new FormControl(''),
    currency: new FormControl(''),






});
  constructor(private customerService: CustomerService , private router: Router) {}

  ngOnInit() {
    this.getCurrencies();
    this.getCustomers();
    this.getOfficer();

  }
  getOfficer(): void {
    this.customerService.getOfficer().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('officer:', response);
        this.officer=response;

        if (this.officer) {
          this.AccountForm.get('officer')?.setValue(this.officer.id);
        }
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching officer:', error);
      }
    );
  }
  getCurrencies(): void {
    this.customerService.getAllCurrency().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('currencies:', response);
        this.currencies=response;

        if (this.currencies && this.currencies.length > 0) {
          this.AccountForm.get('currency')?.setValue(this.currencies[0].id);
        }
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching Nationalities:', error);
      }
    );
  }


  getCustomers(): void {
    this.customerService.getCustomerNoAffect().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('customers:', response);
        this.customers=response;

        if (this.customers && this.customers.length > 0) {
          this.AccountForm.get('customer')?.setValue(this.customers[0].id);
        }

        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching customers:', error);
      }
    );
  }

  onSubmit(): void {
    console.warn(this.AccountForm.value);
    if (this.AccountForm.valid) {
      const {
        title,
        currency,
        closureDate,
        openingDate,
        workingBalance,
        category,
        customer,
        officer,

      } = this.AccountForm.value;

      this.customerService.addAccount(this.AccountForm.value.title!,this.AccountForm.value.currency!,this.AccountForm.value.closureDate!
        ,this.AccountForm.value.openingDate!,this.AccountForm.value.workingBalance!,this.AccountForm.value.category!,this.AccountForm.value.customer!
        ,this.AccountForm.value.officer!
      ).subscribe(
        (response) => {
          // Handle successful login response
          this.router.navigate(['/list-account']);

        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );

      console.log(this.AccountForm.value);
    } else {
      // Handle form validation errors
      console.error('Form validation failed.');
    }
  }

}
