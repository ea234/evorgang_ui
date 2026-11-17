import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { LoginResult } from '../../user/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login 
{
  username: string = 'demo';

  password: string = 'demo123';

  showPassword: boolean = false;

  errorMessage: string = '';

  constructor( private userService: UserService,
               private router: Router,
               private route: ActivatedRoute ) {}

  @Output() loginSuccess = new EventEmitter<string>();

  onLogin() {

    this.userService.doLogin( this.username, this.password ).subscribe( result => {

      if ( result.success ) 
      {
        this.loginSuccess.emit(this.username);

        const returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ];

        if ( returnUrl && returnUrl.startsWith('/evorgang') )
        {
          this.router.navigateByUrl( returnUrl );
        }
        else
        {
          this.router.navigate(['/evorgang']);
        }
      }
      else
      {
        this.errorMessage = result.message;
      } 

    });
  }

  togglePassword(): void 
  {
    this.showPassword = !this.showPassword;
  }
}
