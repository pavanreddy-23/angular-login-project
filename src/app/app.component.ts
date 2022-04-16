import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-login';
  isUserLogedIn = false;

  constructor(private sessionService: SessionService,
    private router: Router) {}

  ngOnInit() {
    this.isUserLogedIn = !!this.sessionService.getUser();

    this.sessionService.getUserAuthSubscription().subscribe(data => {
      this.isUserLogedIn = data;
    });
  }

  onLogout() {
    this.sessionService.clearSession();
    this.router.navigate(['login']);
  }
}
