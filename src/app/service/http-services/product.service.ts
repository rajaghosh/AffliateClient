import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { PaymentModel } from '../../../app/models/checkout.model';
// import { PaymentResponseModel, ProductModel } from '../../../app/models/product.model';
import { ServiceUrl } from '../../service-url';
import { UserRegistrationModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productServiceApi?: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private serviceUrl: ServiceUrl,
    private http: HttpClient
  ) {
    this.productServiceApi = this.serviceUrl.productService;
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = `Error code ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMessage);
  }


  // PostRegistrationDetailsAsync(userRegModel: UserRegistrationModel): Observable<any> {

  //   // const postData = { userRegModel: userRegModel};

  //   const postData = userRegModel;

  //   var url = `${this.productServiceApi}GetProductDetails`;

  //   return this.http.get(url, postData, { headers: this.headers }).pipe(
  //     catchError(this.errorHandler));
  // }

  getProductDetailsAsync(email: string) {

    var url = `${this.productServiceApi}GetProductDetails?userEmail=` + email

    return this.http.get<any>(url, { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }


}
