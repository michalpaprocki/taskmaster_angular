import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";


export const authGuard:CanMatchFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)
    return auth.loadUser().pipe(
        map(user => {
            if(!!user){
                return true
            } 
            router.navigate(["/"], {queryParams: {returnUrl: router.url}})
            return false
        })
    )

}