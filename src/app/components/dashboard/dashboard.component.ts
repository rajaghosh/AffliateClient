import { Component } from '@angular/core';
import { ProductDetailsBasic, ProductDiscountPayload } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/http-services/product.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser: string = "";
  productDetails: ProductDetailsBasic[] = [];
  marketPlaceImgEnv: string = environment.marketplaceEnv + environment.productImageFolder;
  marketPlaceLinkEnv: string = environment.marketplaceUiEnv + environment.productLink;

  percentUpdateForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductService
    , private fBuilder: FormBuilder) {
    if (localStorage.getItem("loggedUser") !== null) {
      this.LoadUpdateControls();

      this.currentUser = localStorage.getItem("loggedUser") ?? "";
      this.GetAllProducts(this.currentUser);

    }
    else {
      //Proceed to logout
    }

  }

  GetAllProducts(email: string) {
    this.productService.getProductDetailsAsync(email).subscribe(s => {

      debugger;

      let result = s;
      let res: ProductDetailsBasic[] = result.data;
      let error = result.error;

      if (error == null || error == undefined) {
        this.productDetails = res;

        if (localStorage.getItem("products") !== null) {
          localStorage.removeItem("products");
        }
        localStorage.setItem("products", JSON.stringify(this.productDetails));


      }

    });
  }


  LoadUpdateControls() {
    this.percentUpdateForm = this.fBuilder.group({
      ProdId: new FormControl('', [
        Validators.required,
      ]),
      DiscountPercent: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.percentUpdateForm.controls[controlName].hasError(errorName);
  };


  onDiscountSubmit(prodId: number) {
    debugger;

    let discountDetails = {} as ProductDiscountPayload;
    discountDetails.ProductId = prodId; //this.percentUpdateForm.value["ProdId"];
    discountDetails.DiscountPercent = parseFloat(this.percentUpdateForm.value["DiscountPercent"]);

    // discountDetails.DiscountPercent = this.percentUpdateForm.control;



    this.productService.PostRegistrationDetailsAsync(discountDetails).subscribe(s => {

      debugger;

      let result = s;
      let res: any = result.data;
      let error = result.error;

      // if (error == null || error == undefined) {
      //   this.productDetails = res;

      //   if (localStorage.getItem("products") !== null) {
      //     localStorage.removeItem("products");
      //   }
      //   localStorage.setItem("products", JSON.stringify(this.productDetails));


      // }

    });

  }


}
