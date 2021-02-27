import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.loginService.login();
    this.dialogRef.close();
  }

}
