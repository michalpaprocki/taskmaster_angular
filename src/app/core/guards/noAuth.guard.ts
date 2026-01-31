import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";

import { map } from "rxjs";
import { AuthService } from "../services/auth.service";



export const noAuthGuard: CanMatchFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)


    return auth.loadUser().pipe(
        map(user => {
            if(user){
                router.navigate(["/"])
                return false
            } 
            return true
        })
    )

}