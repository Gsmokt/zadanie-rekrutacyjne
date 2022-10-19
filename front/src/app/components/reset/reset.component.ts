import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ResetService } from 'src/app/services/reset.service';

interface UserResponse {
  email?: string;
  msg?: string;
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  responseMessage!: UserResponse;
  viewChange: boolean = false;
  @ViewChild('formDirective') private formDirective!: NgForm;
  constructor(
    private formBuilder: FormBuilder,
    private service: ResetService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.service.reset(this.registerForm.value).subscribe({
      next: (data: UserResponse) => {
        this.responseMessage = data;
        this.formDirective.resetForm();
        this.viewChange = !this.viewChange;
      },
      error: (message) => {
        this.responseMessage = message;
      },
    });
  }
}
