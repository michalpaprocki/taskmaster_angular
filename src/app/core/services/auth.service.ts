import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, finalize, map, Observable, of, take, tap, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  http = inject(HttpClient)
  router = inject(Router)
  private BE_URI = environment.BE_URL

  private _user = signal<User | null>(null)
  public readonly user = computed(() => this._user())
  public readonly isAuthenticated = computed(() => !!this._user())
  authChecked = signal(false)
  loading = signal(false)

 loadUser() {
    // check if auth request completed
        if(this.authChecked()){
            return of(this._user())
        }
      // check if request in flight
        if(this.loading()) {
          
          return toObservable(this.authChecked).pipe(
            // wait for authChecked == true
            filter(Boolean),
            // stop after 1st occurance
            take(1),
            // return the value when fetch completes
            map(() => this._user())
          )
        }

        this.loading.set(true)

        return this.fetchUser().pipe(
          tap(user => this._user.set(user)),
          catchError(() => {
            this._user.set(null)
            return of(null)
          }),
          finalize(() => {
            this.authChecked.set(true)
            this.loading.set(false)
          })
        )
    }

  hasValidSession():Observable<boolean> {
    return this.http.get(this.BE_URI+"/auth/session", { withCredentials: true }).pipe(
      map(() => true),
      catchError(err => {
        if(err.status == 401) {
          
          this.clearUser()
          return of(false)
        }
        return throwError(()=>err)
      })
    )
  }
  register(name: string, email: string, password: string) {
    return this.http.post(this.BE_URI + '/auth/register', { name, email, password }, { withCredentials: true })
  }
  login(email: string, password: string) {
    return this.http.post(this.BE_URI+"/auth/login", { email, password }, { withCredentials: true })
  }
  rawHttpFetchUser() {
     return this.http.get<User>(this.BE_URI+"/api/users/me", {withCredentials: true})
  }
  fetchUser() {
    return this.rawHttpFetchUser().pipe(
      tap(user => this._user.set(user)),
      catchError(err => {
           console.error('Failed to fetch user', err);
           this._user.set(null);
          return of(null);
      })
    )
  }
  clearUser(){

    this._user.set(null);
    this.router.navigate(['/']);
  }
  logout() {
    this.clearUser()
    this.http.post(this.BE_URI+ "/auth/logout", {}, { withCredentials: true }).subscribe();
  }

  refresh() {
    return this.http.post(this.BE_URI+"/auth/refresh", {}, {withCredentials: true})
  }
  readonly authState = computed(() => {
    if (!this.authChecked()) return "loading"
    return this._user() ? "authenticated" : "unauthenticated"
  })
    changePassword(oldPassword: string, newPassword:string,) {
      const passwordObject = {oldPassword: oldPassword, newPassword: newPassword}
      return this.http.patch(this.BE_URI+"/api/users/me/password", passwordObject, {withCredentials: true, headers: { 'Content-Type': 'application/json' }})
    }
}
