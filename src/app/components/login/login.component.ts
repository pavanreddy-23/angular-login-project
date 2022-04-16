import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  isLoading = false;

  constructor(private sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionService.clearSession();
  }

  onLogin(loginForm: NgForm){
    loginForm.control.markAllAsTouched();
    if(!loginForm.valid) {
      return;
    }
    this.isLoading = true;
    
    setTimeout(() => {
      this.sessionService.setUser(this.email);
      this.router.navigate(['dashboard']);
      this.isLoading = false;
    }, 1000)
    
  }

}
