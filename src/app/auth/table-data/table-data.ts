import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../auth';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction {
  userid: number;
  firstname: string;
  lastname: string;
  company: string;
  phonenumber: string | null;
  email_ids: string;
  serialNumber: string;
}

export interface ApiResponse {
  httpStatus: number;
  success: boolean;
  timestamp: string;
  data: Transaction[];
  error: any;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table-data.html',
})
export class TableData {

  // API and reactive subjects
  users$: Observable<Transaction[]>;
  filterText$ = new BehaviorSubject<string>(''); 
  page$ = new BehaviorSubject<number>(1);        

  // Filtered & paginated users
  paginatedUsers$: Observable<Transaction[]>;

  // Button disabled observables
  prevDisabled$: Observable<boolean>;
  nextDisabled$: Observable<boolean>;

  pageSize = 5;
  totalPages$!: Observable<number>; // total pages after filter

  constructor(private http: HttpClient, private authService: Auth, private router: Router) {

    // Fetch users
   /* this.users$ = this.http.get<ApiResponse>('http://localhost:8080/api/auth/fetchUserList') */
    this.users$ = this.http.get<ApiResponse>('https://pdftoexcel-latest.onrender.com/api/auth/fetchUserList')
      .pipe(
       map(res => res.success && Array.isArray(res.data) ? res.data : [])
      );

    // Paginated & filtered table
    this.paginatedUsers$ = combineLatest([this.users$, this.filterText$, this.page$]).pipe(
      map(([users, filterText, page]) => {
        const filtered = users.filter(user =>
          user.firstname?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.company?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.email_ids?.toLowerCase().includes(filterText.toLowerCase())
        );

        // Calculate total pages
        const totalPages = Math.ceil(filtered.length / this.pageSize);
        this.totalPages$ = new BehaviorSubject<number>(totalPages).asObservable();

        const start = (page - 1) * this.pageSize;
        return filtered.slice(start, start + this.pageSize);
      })
    );

    // Disable Previous button if page <= 1
    this.prevDisabled$ = this.page$.pipe(map(page => page <= 1));

    // Disable Next button if page >= totalPages
    this.nextDisabled$ = combineLatest([this.users$, this.filterText$, this.page$]).pipe(
      map(([users, filterText, page]) => {
        const filtered = users.filter(user =>
          user.firstname?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.company?.toLowerCase().includes(filterText.toLowerCase()) ||
          user.email_ids?.toLowerCase().includes(filterText.toLowerCase())
        );
        const maxPage = Math.ceil(filtered.length / this.pageSize);
        return page >= maxPage;
      })
    );
  }

  // Filter handler
  onFilterChange(text: string) {
    this.filterText$.next(text);
    this.page$.next(1); // reset to first page
  }

  // Pagination
  nextPage() {
    const currentPage = this.page$.getValue();
    this.page$.next(currentPage + 1);
  }

  prevPage() {
    const currentPage = this.page$.getValue();
    if (currentPage > 1) this.page$.next(currentPage - 1);
  }

  // Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/adminlogin']);
  }

  // User register navigation
  UserRigister() {
    this.router.navigate(['/signup']);
  }

  // Back button
  goBack() {
    window.history.back();
  }

 updateUser(user: any) {
  console.log("Navigating with ID:", user.userid);
  this.router.navigate(['/update-user', user.userid]);
}

}