import { Component, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { error } from "console";


@Component({
    selector: 'profile-page',
    styleUrl: 'profile-page.scss',
    templateUrl: 'profile-page.html',
    imports: [ReactiveFormsModule],
    standalone: true
})

export class ProfilePage {
    auth = inject(AuthService)
    private formBuilder = inject(FormBuilder);
    user = toSignal(this.auth.loadUser())

    errMessage = signal('')
    successMessage = signal('')


  
 
    changePasswordForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        retypedPassword: ['', [Validators.required, Validators.minLength(6)]],

    })
    onSubmit() {
        const {oldPassword, newPassword} = this.changePasswordForm.value
        this.auth.changePassword(oldPassword!, newPassword!).subscribe({
            next: () => {},
            error: (err) => {this.errMessage.set(err.error?.message)},
            complete: () => {this.successMessage.set("Password changed successfully")}
        })

    }
}