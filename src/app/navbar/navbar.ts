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

  hideNavbar = false;

  constructor(public authService: Auth, private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const currentUrl = event.urlAfterRedirects;

        // 🔹 Hide on login and register pages
        this.hideNavbar = currentUrl === '/login' || currentUrl === '/signup';

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