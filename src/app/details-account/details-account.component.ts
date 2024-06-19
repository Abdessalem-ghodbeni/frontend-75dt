import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../Services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrls: ['./details-account.component.css']
})
export class DetailsAccountComponent implements OnInit{


  currencies : any;
  customers : any;
  officer : any;
  idAccount: any;
  accountDetails: any;

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
  constructor(private customerService: CustomerService , private router: Router,private route: ActivatedRoute ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idAccount = params['idAccount'];
      this.getAccountDetails(this.idAccount);
    });

    this.getOfficer();


  }


  getAccountDetails(id: number): void {
    this.customerService.getAccountDetails(id).subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Customer details:', response);
        this.accountDetails = response; // Assign response to a variable to use in the template
        this.AccountForm.patchValue(response); // Patch form with the response values

        const dateOpen = new Date(response.openingDate); // Convert string to Date object
        this.AccountForm.get('openingDate')?.setValue(dateOpen.toISOString().slice(0, 10)); // Set value of dateNaissance control


        const dateClose = new Date(response.closureDate); // Convert string to Date object
        this.AccountForm.get('closureDate')?.setValue(dateClose.toISOString().slice(0, 10)); // Set value of dateNaissance control


        this.AccountForm.get('currency')?.setValue(this.accountDetails.currency.id);





      },
      error => {
        // Handle error
        console.error('Error fetching account details:', error);
      }
    );
  }
  getOfficer(): void {
    this.customerService.getOfficer().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('officer:', response);
        this.officer=response;

      },
      error => {
        // Handle error
        console.error('Error fetching officer:', error);
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

      this.customerService.updateAccount(this.accountDetails.id!,this.AccountForm.value.title!
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
