import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  private readonly users = [
    { username: 'tallybalaji.k@gmail.com', password: 'Balaji@123' },
    { username: 'admin', password: 'abc123' },
    { username: 'users', password: 'pass@123' },
    { username: 'zealglobe', password: 'zeal@123' },
    { username: 'MohanRajBTC',password: 'Mohan@BTC'},
    { username: 'Thangarajsuntech',password:'Suntech@123'},
    { username: 'PriyangaBTC',password:'BTC@2526'},
    { username: 'Srinivasan',password:'Sarvasri@123'},
    { username: 'Balamurugan',password:'Bala@123'},
    {username : 'Uma@BTC',password:'Uma@123'}
  ];

  constructor() {}

  login(username: string, password: string): boolean {

    const foundUser = this.users.find(
      user => user.username === username && user.password === password
    );

    if (!foundUser) {
      alert('❌ Invalid username or password');
      return false;
    }

    const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');

    if (activeUsers[username]) {
      alert(`⚠️ User "${username}" is already logged in on another device or tab.`);
      return false;
    }

    // Mark user active
    activeUsers[username] = true;
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));

    // Store session info
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('loginTime', Date.now().toString());

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
    localStorage.removeItem('loginTime');
  }

  isLoggedIn(): boolean {
    const loginTime = localStorage.getItem('loginTime');

    if (!loginTime) {
      return false;
    }

    const now = Date.now();
    const elapsed = now - Number(loginTime);

    // ⏰ Session expired
    if (elapsed > this.SESSION_DURATION) {
      alert('⏰ Session expired. Please login again.');
      this.logout();
      return false;
    }

    return localStorage.getItem('loggedIn') === 'true';
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }
}
