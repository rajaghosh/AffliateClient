import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatInput, MatFormField, MatButton } from '@angular/material/form-field';
import { UserRegistrationModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../service/http-services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  // registationStatus: boolean = false;

  constructor(private fBuilder: FormBuilder
    , private dialog: MatDialog
    , private userService: UserService
    , private router: Router
  ) {
    this.LoadRegistrationControls();
    this.LoadLoginControls();
  }

  ngOnInit() {
  }

  LoadRegistrationControls() {
    this.registrationForm = this.fBuilder.group({
      Name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }


  LoadLoginControls() {
    this.loginForm = this.fBuilder.group({
      Email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }


  onRegistrationSubmit() {

    debugger;

    let registrationDetails = {} as UserRegistrationModel;
    registrationDetails.Email = this.registrationForm.value["Email"];
    registrationDetails.Name = this.registrationForm.value["Name"];
    registrationDetails.Password = this.registrationForm.value["Password"];

    // console.log(this.registrationForm.value);


    try {
      const dialogRefRegistrationInProgress = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: {
          message: "Registration in progress...",
          spinnerOn: true,
          confirmButtonText: '',
          buttonText: {
            ok: '',
            cancel: ''
          }
        }
      });

      debugger;

      this.userService.PostRegistrationDetailsAsync(registrationDetails).subscribe(s => {

        let result = s;
        let res: number = result.data;
        let error = result.error;

        debugger;


        dialogRefRegistrationInProgress.close();  //Closing the loader component

        //****************************************************************************/
        //If registration successful
        //****************************************************************************/
        if (res == 0 && (error == null || error == undefined)) {

          const dialogRefRegistrationSuccess = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            data: {
              message: "Registration is successful.",
              buttonText: {
                ok: 'Login with credentials'
              }
            }
          });

          dialogRefRegistrationSuccess.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
              const a = document.createElement('a');
              a.click();
              a.remove();

              // this.ProceedToHomePage();
            }
          });
        }
        //****************************************************************************/
        //If registration issue
        //****************************************************************************/
        else {

          const dialogRefRegistrationIssue = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            data: {
              message: "Issue in registration. " + error.errorMessage,
              buttonText: {
                ok: 'Modify details',
                cancel: '',
                Other: ''
              }
            }
          });

          dialogRefRegistrationIssue.afterClosed().subscribe((confirmed: any) => {

            if (confirmed) {
              const a = document.createElement('a');
              a.click();
              a.remove();
            }
          });
        }

      });



    } catch (ex) {

    }







  }


  onLoginSubmit() {

    debugger;

    let loginDetails = {} as UserRegistrationModel;
    loginDetails.Email = this.loginForm.value["Email"];
    loginDetails.Name = ''; //this.loginForm.value["Name"];
    loginDetails.Password = this.loginForm.value["Password"];

    // console.log(this.loginForm.value);

    try {
      const dialogRefLoginInProgress = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: {
          message: "Login in progress...",
          spinnerOn: true,
          confirmButtonText: '',
          buttonText: {
            ok: '',
            cancel: ''
          }
        }
      });

      // this.registationStatus = false;

      debugger;

      this.userService.PostLoginDetailsAsync(loginDetails).subscribe(s => {

        let result = s;
        let res: string = result.data;
        let error = result.error;

        debugger;


        dialogRefLoginInProgress.close();  //Closing the loader component

        //****************************************************************************/
        //If login successful
        //****************************************************************************/
        if (res != '' && (error == null || error == undefined)) {

          //Go To Dashboard
          this.ResetSetLoggedInUser(loginDetails.Email);
          this.ProceedToLoginDashboard();

        }
        //****************************************************************************/
        //If registration issue
        //****************************************************************************/
        else {

          const dialogRefLoginIssue = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            data: {
              message: "Issue in login. " + error.errorMessage,
              buttonText: {
                ok: 'Modify details',
                cancel: '',
                Other: ''
              }
            }
          });

          dialogRefLoginIssue.afterClosed().subscribe((confirmed: any) => {

            if (confirmed) {
              const a = document.createElement('a');
              a.click();
              a.remove();
            }
          });
        }

      });



    } catch (ex) {

    }
  }

  ResetRegistrationForm() {
    this.registrationForm.reset();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  };

  public checkErrorLogin = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  // ProceedToHomePage() {
  //   window.location.href = this.router['location']._platformLocation.location.origin;
  // }

  ProceedToLoginDashboard() {
    window.location.href = '/dashboard';
  }

  ResetSetLoggedInUser(email: string){
    localStorage.removeItem("loggedUser");
    localStorage.setItem("loggedUser", email);
  }

}