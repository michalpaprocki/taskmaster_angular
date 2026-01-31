import {  Component, inject, signal } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";

import { Router, RouterLinkWithHref } from "@angular/router";



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
    imports: [ReactiveFormsModule, RouterLinkWithHref],
    standalone: true
})

export class RegisterForm {

    private router = inject(Router);
    private auth = inject(AuthService);
    private formBuilder = inject(FormBuilder);

    errMessage =signal('')
    successMessage = signal('')

    registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    })
    
    onSubmit() {
        this.errMessage.set('');

        const {name, email, password} = this.registerForm.value;

        this.auth.register(name!, email!, password!)
        .subscribe({
            next: () => {
            
            },
            error: (err:ErrorResponse) => {this.errMessage.set(err.error?.message ?? 'Registration failed')},
            complete: ()  => {
                this.successMessage.set("Registration successfull, redirecting to home page...")
                setTimeout(() => {
                        this.router.navigate(["/"])
                }, 1000);
            }
        })
    
    }
  }
