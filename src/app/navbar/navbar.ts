import { Component } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  isLoginPage = false;

  constructor(public authService: Auth, private router: Router) {

    // ✅ MOVE THIS INSIDE CONSTRUCTOR
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/login';
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToSamples() {
    this.router.navigate(['/samples']);
  }
}
