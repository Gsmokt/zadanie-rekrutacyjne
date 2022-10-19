import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

interface UserResponse {
  email?: string;
  msg?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  reset = false;
  formName: boolean = false;
  registerForm!: FormGroup;
  submitted: boolean = false;
  responseMessage!: UserResponse;
  @ViewChild('formDirective') private formDirective!: NgForm;
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.service.login(this.registerForm.value).subscribe({
      next: (data: UserResponse) => {
        this.responseMessage = data;
        this.formDirective.resetForm();
      },
      error: (message) => {
        console.log(message);
      },
    });
  }
}
