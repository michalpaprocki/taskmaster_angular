import { NgIf } from "@angular/common";
import { ChangeDetectorRef, Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
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
    imports: [ReactiveFormsModule, NgIf, RouterLinkWithHref]
})

export class LoginForm {

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private auth = inject(AuthService);

    errMessage = signal('');
    user = signal<any | null>(null);





    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    })
    onSubmit() {
        this.errMessage.set('');

        const {email, password} = this.loginForm.value;

        this.auth.login(email!, password!).pipe(
            switchMap(() => this.auth.rawHttpFetchUser()),
            tap({
                next: (user) => this.user.set(user),
                error: (err: ErrorResponse) => this.errMessage.set(err.error?.message ?? 'Login failed')
            })
        ) 
        .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => {}
      });

    }
}