
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { switchMap, tap } from "rxjs";


interface ErrorResponse {
    error: {
        message?: string,
        path?: string,
        timestamp?: Date
    }
}

@Component({
    selector: 'login-form-component',
    templateUrl: 'login-form.html',
    imports: [ReactiveFormsModule, RouterLinkWithHref],
    standalone: true
})

export class LoginForm {

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private auth = inject(AuthService);

    errMessage = signal('');
    successMessage = signal('')

    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    })
    onSubmit() {
        this.errMessage.set('');

        const {email, password} = this.loginForm.value;

        this.auth.login(email!, password!)
        .subscribe({
        next: () => {this.successMessage.set("Log in successfull, redirecting to home page...")},
        error: (err) => {this.errMessage.set(err.error?.message ?? 'Login failed')},
        complete: () => {
            setTimeout(() => {
                this.router.navigate(['/'])
            }, 1000);
        }
      });

    }
}