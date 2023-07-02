import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatInput, MatFormField, MatButton } from '@angular/material/form-field';
import { UserRegistrationModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../service/http-services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  registationStatus: boolean = false;

  constructor(private fBuilder: FormBuilder
    , private dialog: MatDialog
    // , private userService: UserService
  ) {
    debugger;
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

    console.log(this.registrationForm.value);


    try {
      // const dialogRefRegistrationInProgress = this.dialog.open(ConfirmDialogComponent, {
      //   disableClose: true,
      //   data: {
      //     message: "Registration in progress...",
      //     spinnerOn: true,
      //     confirmButtonText: '',
      //     buttonText: {
      //       ok: '',
      //       cancel: ''
      //     }
      //   }
      // });

      this.registationStatus = false;

      debugger;

      // this.userService.PostRegistrationDetailsAsync(registrationDetails).subscribe(s => {

      //   let result = s;
      //   let res: number = result.Data;
      //   let error = result.Error;

      //   debugger;

      //   //If payment Successful
      //   if (res > 0 && error != null && error != undefined) {

      //     dialogRefRegistrationInProgress.close();

      //     const dialogRefRegistrationSuccess = this.dialog.open(ConfirmDialogComponent, {
      //       disableClose: true,
      //       data: {
      //         message: "Registration is successful.",
      //         buttonText: {
      //           ok: 'Go To Home'
      //         }
      //       }
      //     });

      //     dialogRefRegistrationSuccess.afterClosed().subscribe((confirmed: boolean) => {
      //       if (confirmed) {
      //         const a = document.createElement('a');
      //         a.click();
      //         a.remove();

      //       }
      //     });



      //   }
      //   else {

      //     dialogRefRegistrationInProgress.close();

      //     const dialogRefRegistrationIssue = this.dialog.open(ConfirmDialogComponent, {
      //       disableClose: true,
      //       data: {
      //         message: "Issue in payment. " + error,
      //         buttonText: {
      //           ok: 'Go To Home',
      //           cancel: '',
      //           Other: ''
      //         }
      //       }
      //     });

      //     dialogRefRegistrationIssue.afterClosed().subscribe((confirmed: any) => {

      //       if (confirmed == true) {
      //         const a = document.createElement('a');
      //         a.click();
      //         a.remove();
      //       }
      //       else if (confirmed == "OtherButtonClose") {
      //         // const a = document.createElement('a');
      //         // a.click();
      //         // a.remove();
      //       }
      //       else {
      //         // this.MakePayment(); //Recursive
      //       }
      //     });


      //   }



      // });



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

}