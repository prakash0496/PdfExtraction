import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  // 🔹 Form fields
  firstName = '';
  lastName = '';
  company = '';
  emailAddress = '';
  password = '';

  // 🔹 Social signup options (example)
  SignUpOptions = [
    { name: 'Google', image: 'assets/images/authentication/google.svg' },
    { name: 'Facebook', image: 'assets/images/authentication/facebook.svg' },
    { name: 'Twitter', image: 'assets/images/authentication/twitter.svg' }
  ];

  // 🔹 Signup handler
  onSignup() {
    console.log('📝 Signup details:');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Company:', this.company);
    console.log('Email:', this.emailAddress);
    console.log('Password:', this.password);

    if (!this.firstName || !this.lastName || !this.emailAddress || !this.password) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('✅ Account created successfully!');
  }
}
