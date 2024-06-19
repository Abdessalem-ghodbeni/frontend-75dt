import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private accountService: AccountService , private router: Router) {

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submit");
    console.warn(this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.accountService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe(
        (response:any) => {
          // Handle successful login response
          console.log('Login successful', response);

          sessionStorage.setItem("matricule",response.matricule);
          sessionStorage.setItem("nom",response.nom);
          sessionStorage.setItem("prenom",response.prenom);
          sessionStorage.setItem("token",response.token);
          sessionStorage.setItem("mail",response.email);
          sessionStorage.setItem("password",response.password);
          sessionStorage.setItem("role",response.role);

          if(response.role==="EMPLOYE")
            this.router.navigate(['/list-customer']);


          // Redirect or do something else
        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );
    }
  }



}
