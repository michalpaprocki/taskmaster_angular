import { Component, inject, OnInit, signal } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { User } from "../../models/user.model";


@Component({
    selector: 'users-page',
    styleUrl: 'users-page.scss',
    templateUrl: 'users-page.html',
    imports: [],
    standalone: true
})

export class UsersPage implements OnInit{
    userService = inject(UserService)
    users = signal<User[]|null>(null)
    errMessage = signal('')
    ngOnInit(): void {
        this.userService.getUsers().subscribe({
            next: u => {
                this.users.set(u)
            },
            error: err => {
                this.errMessage.set(err.error?.message)
            }
        })
    }
}