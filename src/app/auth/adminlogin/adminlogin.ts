import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']
})
export class Adminlogin {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {

    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);

    this.http.post<any>("http://localhost:8080/api/auth/adminlogin", formData)
      .subscribe({
        next: (res) => {

          if (res.success) {
            alert("✅ Login Successful");
            this.router.navigate(['/table-data']);
          } else {
            alert("❌ " + res.message);
          }

        },
        error: () => {
          alert("❌ Login failed");
        }
      });
  }

    onSignUp() {
    this.router.navigate(['/login']);
  }

}