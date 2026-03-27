import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';
  showPassword = false;
  selectedFile!: File;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // 👁 Toggle password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 📁 File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🔐 Login with license file
  onLogin() {

    if (!this.selectedFile) {
      alert("Please select license file");
      return;
    }

    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);
    formData.append("file", this.selectedFile); 

   this.http.post<any>("https://pdftoexcel-latest.onrender.com/api/auth/login", formData) 
 /* this.http.post<any>("http://localhost:8080/api/auth/login", formData)  */
      .subscribe({
        next: (res) => {

          if (res.success) {
            alert("✅ Login successful");
            this.router.navigate(['/pdfextract']);
          } else {
            alert("❌ " + res.message);
          }

        },
        error: () => {
          alert("❌ Login failed");
        }
      });
  }

  // 🔁 Go to signup
  onSignUp() {
    this.router.navigate(['/signup']);
  }

  onAdminLogin() {
  // navigate to admin login page
  this.router.navigate(['/adminlogin']);
}

onForgotPassword() {
  this.router.navigate(['/forget-password']);
}

onForgotUsername() {
  this.router.navigate(['/forgot-username']);
}


}