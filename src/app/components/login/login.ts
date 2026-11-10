import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { LoginResult } from '../../user/service/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  username: string = 'demo';

  password: string = 'demo123';

  showPassword: boolean = false;

  errorMessage: string = '';

  constructor( private userService: UserService ) {}

  @Output() loginSuccess = new EventEmitter<string>();


  onLogin() {

    this.userService.doLogin( this.username, this.password ).subscribe( result => {

      if ( result.success ) 
      {
        this.loginSuccess.emit(this.username);
      }
      else
      {
        this.errorMessage = result.message;
      } 

    });
  }

  dellme_onLogin(): void {

    this.errorMessage = '';

    if ( !this.username || !this.password ) 
    {
      this.errorMessage = 'Bitte Benutzername und Passwort eingeben.';

      return;
    }

    if ( this.username === 'demo' &&  this.password === 'demo123' ) 
    {
      this.loginSuccess.emit(this.username);
    } 
    else 
    {
      this.errorMessage = 'Benutzername oder Passwort ist falsch.';
    }
  }

  togglePassword(): void 
  {
    this.showPassword = !this.showPassword;
  }
}
