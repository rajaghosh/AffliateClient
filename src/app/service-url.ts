import { environment } from '../environments/environment'
import { Injectable } from "@angular/core";


// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ServiceUrl {
    userService?: string;
    // subscriptionService?: string;
    // paymentService?: string;

  constructor() {
    this.userService = environment.apiUrlMain + "User/";
    // this.subscriptionService = environment.apiUrlMain + "Subscription/";
    // this.paymentService = environment.apiUrlMain + "Payment/";
  }

}