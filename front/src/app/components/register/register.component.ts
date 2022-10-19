import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  reset = false;
  formName: boolean = false;
  registerForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('formDirective') private formDirective!: NgForm;
  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validator: this.passwordCompare,
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.service
      .register({
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
        id: uuid(),
      })
      .subscribe({
        next: () => {
          this.formDirective.resetForm();
          this.router.navigateByUrl('/login');
        },
        error: (message) => {
          console.log(message);
        },
      });
  }

  passwordCompare(fb: FormGroup) {
    if (
      fb?.controls['password']?.value === fb.controls['passwordConfirm']?.value
    ) {
      return null;
    } else {
      return { incorrectPassword: true };
    }
  }
}
