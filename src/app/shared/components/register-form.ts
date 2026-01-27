import { ChangeDetectorRef, Component, DoCheck, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { NgIf } from "@angular/common";
import { Router, RouterLinkWithHref } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { switchMap } from "rxjs";

interface ErrorResponse {
    error: {
        message?: string,
        path?: string,
        timestamp?: Date
    }
}



@Component({
    selector: 'register-form-component',
    templateUrl: 'register-form.html',
    imports: [ReactiveFormsModule, NgIf, RouterLinkWithHref]
})

export class RegisterForm {

    private formBuilder = inject(FormBuilder);
    errMessage =signal('')

    constructor(private router: Router, private auth: AuthService, private cdr: ChangeDetectorRef) {}

    registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    })
    

    onSubmit() {
        this.errMessage.set('');

        const {name, email, password} = this.registerForm.value;

        this.auth.register(name!, email!, password!).subscribe({
            next: () => {},
            error: (err:ErrorResponse) => this.errMessage.set(err.error?.message ?? 'Registration failed')
        })
    
    }
  }
