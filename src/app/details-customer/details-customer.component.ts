import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../Services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit{

  nationalities : any;
  genderEnabled = true;
  officer : any;
  placeholderlegaldocname: string = 'Enter legal document name';
  customerDetails: any;
  idCustomer: any;

  customerForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('PP'),
    dateBirthCreation: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl('male'),
    legalDocName: new FormControl(''),
    legalId: new FormControl(''),
    postCode: new FormControl(''),
    tel: new FormControl(''),
    mail: new FormControl(''),
    officer: new FormControl(''),
    nationality: new FormControl(),





  });
  constructor(private customerService: CustomerService , private router: Router,private route: ActivatedRoute ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idCustomer = params['idCustomer'];
      this.getCustomerDetails(this.idCustomer);
    });

    this.getNationalities();
    this.getOfficer();

    if(this.customerForm.value.type==="PP")
    {
      this.genderEnabled==true;
      this.placeholderlegaldocname="CIN/PASSEPORT/CARTE_SEJOUR";

    }
    else
    {
      this.genderEnabled==false;
      this.placeholderlegaldocname="REGISTRE_COMMERCE/ID_FISCAL";

    }


  }

  getCustomerDetails(id: number): void {
    this.customerService.getCustomerDetails(id).subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Customer details:', response);
        this.customerDetails = response; // Assign response to a variable to use in the template
        this.customerForm.patchValue(response); // Patch form with the response values

        const dateCreation = new Date(response.dateBirthCreation); // Convert string to Date object
        this.customerForm.get('dateBirthCreation')?.setValue(dateCreation.toISOString().slice(0, 10)); // Set value of dateNaissance control

        this.changeType();
        if (this.officer) {
          this.customerForm.get('officer')?.setValue(this.officer.id);
        }

        this.customerForm.get('nationality')?.setValue(this.customerDetails.country.id);


      },
      error => {
        // Handle error
        console.error('Error fetching adherent details:', error);
      }
    );
  }




  getNationalities(): void {
    this.customerService.getAllNationality().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Nationalities:', response);
        this.nationalities=response;

        if (this.nationalities && this.nationalities.length > 0) {
          this.customerForm.get('nationality')?.setValue(this.nationalities[0].id);
        }
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching Nationalities:', error);
      }
    );
  }


  getOfficer(): void {
    this.customerService.getOfficer().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('officer:', response);
        this.officer=response;

        if (this.officer) {
          this.customerForm.get('officer')?.setValue(this.officer.id);
        }
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching officer:', error);
      }
    );
  }

  onSubmit(): void {
    console.warn(this.customerForm.value);
    if (this.customerForm.valid) {
      const {
        name,
        type,
        dateBirthCreation,
        address,
        gender,
        legalDocName,
        legalId,
        postCode,
        tel,
        mail,
        officer,
        nationality,
      } = this.customerForm.value;

      this.customerService.updateCustomer(this.idCustomer,this.customerForm.value.name!,this.customerForm.value.type!,this.customerForm.value.dateBirthCreation!
        ,this.customerForm.value.address!,this.customerForm.value.gender!,this.customerForm.value.legalDocName!,this.customerForm.value.legalId!
        ,this.customerForm.value.postCode!,this.customerForm.value.tel!,this.customerForm.value.mail!,this.customerForm.value.officer!
        ,this.customerForm.value.nationality!
      ).subscribe(
        (response:any) => {
          // Handle successful login response
          console.log('Add Customer succesfull', response);
          this.router.navigate(['/list-customer']);

        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );

      console.log(this.customerForm.value);
    } else {
      // Handle form validation errors
      console.error('Form validation failed.');
    }
  }




  changeType() {
    // Enable or disable the 'Gender' dropdown based on the selected 'Type'
    if (this.customerForm.value.type === 'PP') {
      this.genderEnabled = true;
      this.customerForm.get('gender')?.setValue("male");

      this.placeholderlegaldocname="CIN/PASSEPORT/CARTE_SEJOUR";


    }
    else if (this.customerForm.value.type === 'PM') {
      this.genderEnabled = false;
      this.customerForm.get('gender')?.setValue("autre");
      this.placeholderlegaldocname="REGISTRE_COMMERCE/ID_FISCAL";

    }
  }

}
