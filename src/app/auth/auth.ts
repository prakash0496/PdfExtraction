import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

   private baseUrl = 'http://localhost:8080/api/tally'; // 🔹 your backend API base URL

     constructor(private http: HttpClient) {}


// 🔹 Multiple hardcoded users
  private readonly users = [
    { username: 'admin', password: '12345' },
    { username: 'user1', password: 'abc123' },
    { username: 'manager', password: 'pass@123' },
    { username: 'zeal', password: 'zeal123' }
  ];

  // login(username: string, password: string): Observable<any> {
  //   const body={username,password};
  //   return this.http.post(`${this.baseUrl}/verify`, body).pipe(
  //       tap((response: any) => {
  //       // if backend sends a token or success flag
  //       if (response.success) {
  //         localStorage.setItem('loggedIn', 'true');
  //         // optionally store JWT token
  //         // localStorage.setItem('token', response.token);
  //       }
  //     })
  //   );
login(username: string, password: string): boolean {
    // 🔹 Check if any user matches the given credentials
    const foundUser = this.users.find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', foundUser.username); // optional
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

   getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }

  
}
