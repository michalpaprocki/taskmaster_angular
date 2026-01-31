import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import { User } from "../../models/user.model";
import { AuthService } from "../services/auth.service";


@Injectable({providedIn: 'root'})
export class AuthResolver implements Resolve<User | null> {
    auth = inject(AuthService)

    resolve(route: ActivatedRouteSnapshot) {
    
        return this.auth.loadUser()
    }
}