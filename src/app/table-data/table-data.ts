import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Transaction {
  firstname: string;
  lastname: string;
  company: string;
  email_ids:string;
  branch: string;
 
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-data.html',
  styleUrls: ['./table-data.css']
})
export class TableData implements OnInit  {

  users: Transaction[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<Transaction[]>('http://localhost:8080/api/users/all')
      .subscribe({
        next: (response) => {
          console.log('Fetched Users:', response);
          this.users = response;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}
