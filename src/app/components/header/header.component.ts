import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(
      private router: Router) {
    // this.LoadRegistrationControls();
    // this.LoadLoginControls();
    if (localStorage.getItem("loggedUser") !== null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

  }

  OpenRegisterLogin() {
    window.location.href = '/register';
  }

  
  Logout(){
    debugger;
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  }

}
