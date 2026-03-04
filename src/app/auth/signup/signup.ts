import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  // 🔹 Form fields
  firstname = '';
  lastname = '';
  company = '';
  email_ids = '';
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔹 Signup handler
  onSignup() {

    // Validation
    if (!this.firstname || !this.lastname || !this.email_ids || !this.username || !this.password) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      firstname: this.firstname,
      lastname: this.lastname,
      company: this.company,
      email_ids: this.email_ids,
      username: this.username,
      password: this.password
    };

    console.log("📤 Sending data to backend:", payload);

    this.http.post('https://pdftoexcel-latest.onrender.com/api/auth/register', payload)
      .subscribe({
        next: (response) => {
          console.log("✅ User saved:", response);
          alert("Account created successfully!");
          this.router.navigate(['/login']);   // redirect to login page
        },
        error: (error) => {
          console.error("❌ Error:", error);
          alert("Registration failed. Please try again.");
        }
      });
  }
}