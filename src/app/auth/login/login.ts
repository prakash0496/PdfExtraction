import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ very important for standalone components
  imports: [FormsModule], // ✅ required for [(ngModel)]
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // ✅ fixed plural
})
export class Login {
  username = '';
  password = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/pdfextract']);

    } else {
      alert('Invalid credentials');
    }
  }
  onSignUp() {
    // ✅ Redirect to signup page
    this.router.navigate(['/signup']);
  }
}
