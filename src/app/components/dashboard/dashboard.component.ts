import { Component } from '@angular/core';
import { ProductDetailsBasic } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/http-services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser: string = "";
  productDetails: ProductDetailsBasic[] = [];
  marketPlaceImgEnv:string = environment.marketplaceEnv + environment.productImageFolder;
  marketPlaceLinkEnv:string = environment.marketplaceUiEnv + environment.productLink;

  constructor(
    private productService: ProductService) {
    if (localStorage.getItem("loggedUser") !== null) {
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


}
