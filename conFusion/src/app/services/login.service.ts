import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged: boolean = false;

  constructor() { }

  login() {
    this.logged = true;
  }

  isLogged(): boolean {
    return this.logged;
  }
}
