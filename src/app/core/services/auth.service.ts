import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private BE_URI = 'http://localhost:8080'

  private _user = signal<User | null>(null)
  public readonly user = computed(() => this._user())
  public readonly isAuthenticated = computed(() => !!this._user())
  constructor(private router: Router, private http: HttpClient) {

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
    return this.http.post(`${this.BE_URI}/auth/login`, { email, password }, { withCredentials: true })
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
    this.http.post(`${this.BE_URI}/auth/logout`, {}, { withCredentials: true }).subscribe();
  }

  refresh() {
    return this.http.post(this.BE_URI+"/auth/refresh", {}, {withCredentials: true})
  }
}
