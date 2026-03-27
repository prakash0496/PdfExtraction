import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forget-login.html',
  styleUrls: ['./forget-login.css']
})
export class ForgetLogin {

  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showPasswordFields: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  verifyUsername() {

    if (!this.username.trim()) {
      alert("Enter username");
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/auth/check-user?username=${this.username}`)
      .subscribe({

        next: (res) => {

          console.log("API Response:", res);

          if (res && res.success === true) {
            this.showPasswordFields = true;
          } else {
            this.showPasswordFields = false;
            this.newPassword = '';
            this.confirmPassword = '';
            alert(res?.message || "Username not found");
          }

        },

        error: () => {
          alert("Server error while verifying username");
        }

      });
  }


  updatePassword() {

    if (!this.newPassword || !this.confirmPassword) {
      alert("Please enter both password fields");
      return;
    }

    if (this.newPassword.trim() !== this.confirmPassword.trim()) {
      alert("Passwords do not match");
      return;
    }

    this.http.post<any>("http://localhost:8080/api/auth/update-password", {
      username: this.username,
      password: this.newPassword
    })
    .subscribe({

      next: () => {
        alert("Password updated successfully");
        this.router.navigate(['/login']);
      },

      error: () => {
        alert("Error updating password");
      }

    });
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }


  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}