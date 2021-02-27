import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.loginService.isLogged()) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
