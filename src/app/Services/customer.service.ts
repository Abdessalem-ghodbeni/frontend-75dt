import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private ApiUrl = 'http://localhost:8080/customer/'; // Replace with your actual login endpoint URL

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAll",{headers:headers});

  }
  getAccounts(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAccountsNoAffect",{headers:headers});

  }
  getAllAccounts(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAccounts",{headers:headers});

  }

  getCustomerNoAffect(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getCustomerNoAffect",{headers:headers});

  }

  getAllNationality(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAllNationality",{headers:headers});

  }
  getAllCurrency(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAllCurrency",{headers:headers});

  }

  getOfficer(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const Matricule = sessionStorage.getItem('matricule');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+`getOfficer/${Matricule}`,{headers:headers});

  }


  addCustomer(
    name:any
    ,type:any
    ,dateBirthCreation:any
    ,address:any
    ,gender:any
    ,legalDocName:any
    ,legalId:any
    ,postCode:any
    ,tel:any
    ,mail:any
    ,officer:any
    ,nationality:any

  ): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    console.log(dateBirthCreation);
    return this.http.post(this.ApiUrl+"addCustomer/"+nationality+"/"+officer, {
      name
      ,type
      ,dateBirthCreation
      ,address
      ,gender
      ,legalDocName
      ,legalId
      ,postCode
      ,tel
      ,mail
    },{headers:headers});
  }


  updateCustomer(
    id : any,
    name:any
    ,type:any
    ,dateBirthCreation:any
    ,address:any
    ,gender:any
    ,legalDocName:any
    ,legalId:any
    ,postCode:any
    ,tel:any
    ,mail:any
    ,officer:any
    ,nationality:any

  ): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    console.log(dateBirthCreation);
    return this.http.post(this.ApiUrl+"updateCustomer/"+nationality+"/"+officer, {
      id,
      name
      ,type
      ,dateBirthCreation
      ,address
      ,gender
      ,legalDocName
      ,legalId
      ,postCode
      ,tel
      ,mail
    },{headers:headers});
  }


  updateAccount(
    id : any,
    newtitle:any

  ): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.ApiUrl+"updateAccount/"+id+"/"+newtitle, {},{headers:headers});
  }

  getCustomerDetails(id: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.ApiUrl}getDetailsCustomer/${id}`, { headers: headers });
  }

  getAccountDetails(id: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.ApiUrl}getDetailsAccount/${id}`, { headers: headers });
  }



  addAccount(
    title:any
    ,currency:any
    ,closureDate:any
    ,openingDate:any
    ,workingBalance:any
    ,category:any
    ,customer:any
    ,officer:any


  ) {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

     return this.http.post(this.ApiUrl+"addAccount/"+customer+"/"+currency+"/"+officer, {
      title
      ,closureDate
      ,openingDate
      ,workingBalance
      ,category
    },{headers:headers});
  }




}
