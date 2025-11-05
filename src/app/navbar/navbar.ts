import { Component } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
constructor(private authService: Auth, private router: Router) {}  // ✅ Inject both

  logout() {
    this.authService.logout();          // ✅ Clears login info
    this.router.navigate(['/login']);   // ✅ Redirect to login page
  }
}
