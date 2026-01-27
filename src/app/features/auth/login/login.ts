import { Component } from '@angular/core';
import { LoginForm } from '../../../shared/components/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
