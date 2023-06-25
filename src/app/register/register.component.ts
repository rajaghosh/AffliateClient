// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatInput, MatFormField, MatButton } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});

  constructor(private fBuilder: FormBuilder) {
    this.LoadRegistrationControls();
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


  onSubmit() {
    console.log(this.registrationForm.value);
  }

}