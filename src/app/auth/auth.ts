import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  // Hardcoded users
  private readonly users = [
    { username: 'tallybalaji.k@gmail.com', password: 'Balaji@123' },
    { username: 'admin', password: 'abc123' },
    { username: 'users', password: 'pass@123' },
    { username: 'zealglobe', password: 'zeal@123' }
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    // Check if valid user
    const foundUser = this.users.find(
      user => user.username === username && user.password === password
    );

    if (!foundUser) {
      alert('❌ Invalid username or password');
      return false;
    }

    // Check if this username is already logged in (from any browser)
    const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');

    if (activeUsers[username] && activeUsers[username] === true) {
      alert(`⚠️ User "${username}" is already logged in on another device or tab.`);
      return false;
    }

    // Mark this user as logged in
    activeUsers[username] = true;
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));

    // Also mark session info
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);

    return true;
  }

  logout(): void {
    const username = localStorage.getItem('username');
    if (username) {
      const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
      delete activeUsers[username];
      localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }

    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }
}
