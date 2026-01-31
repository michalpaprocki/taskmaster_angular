import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, ReplaySubject, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";


let isRefreshing = false
const refreshSubject = new ReplaySubject<boolean>(1)
// similar to express middlewares or elixir plugs
export const AuthInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn): Observable<HttpEvent<unknown>>  => {
    

    const authService = inject(AuthService)
    const request = req.clone({
        withCredentials:true
    })

    return next(request).pipe(
        catchError(err => {

            if(err.status == 400){
                // do nothing and allow to continue, components handle validation errors
                return throwError(() => err)
            }
            // ignore 401 from session and refresh endpoints
            if(err.status == 401 && !req.url.includes("/auth/refresh") && !req.url.includes("/auth/session")) {
                return handle401(request, next, authService)
            }
            // clear user on 401 from session and refresh endpoints
            if(err.status === 401 && req.url.includes("/auth/refresh") || req.url.includes("/auth/session")) {
                authService.clearUser();
            }
            return throwError(() => err);
        })
    )

}
    const handle401 = (request:HttpRequest<unknown>, next:HttpHandlerFn, authService:AuthService): Observable<HttpEvent<unknown>>  => {
        if (!isRefreshing) {
                isRefreshing = true;
                refreshSubject.next(false);

                return authService.refresh().pipe(
                    switchMap(() => {
                        isRefreshing = false;
                        refreshSubject.next(true);
                        return next(request); // retry original request
                    }),
                    catchError(err => {
                        isRefreshing = false;
                        refreshSubject.next(false);
                        authService.clearUser(); // no valid refresh, log out
                        return throwError(() => err);
                })
            )
        }

        return refreshSubject.pipe(
        filter(v => v !== null),
        take(1),
        switchMap(v => {
            if (v) return next(request); // refresh succeeded
            else return throwError(() => new Error("Refresh failed"));
            })
        );
    }