import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userEmail: string | null;
  userAuthSubject = new Subject<boolean>();

  constructor() {
    this.userEmail = localStorage.getItem('user_email');
  }

  getUser() {
    return this.userEmail;
  }

  setUser(email: string) {
    this.userEmail = email;
    localStorage.setItem('user_email', this.userEmail);
    this.userAuthSubject.next(true);
  }

  clearSession() {
    localStorage.clear();
    this.userAuthSubject.next(false);
    this.userEmail = null;
  }

  getUserAuthSubscription() {
    return this.userAuthSubject.asObservable();
  }
}
