import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

// 🔹 Transaction Interface
export interface Transaction {
  transactionDate: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
  voucherType: string;
  LedgerName: string;
  [key: string]: any;
}

@Component({
  selector: 'app-pdf-extract',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pdf-extract.html',
  styleUrls: ['./pdf-extract.css']
})
export class PdfExtract {
  selectedBank: string = '';
  selectAccountType:string = '';
  typeBank: string='';
  file: File | null = null;

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  showTable = false;
  showPasswordField = false;
  showAccountTypeField = false;
  pdfPassword: string = '';

  // 🔹 Totals
  totalDebit = 0;
  totalCredit = 0;
  totalAmount = 0;

  // 🔹 Filters
  filters: any = {
    transactionDate: '',
    voucherType: '',
    description: '',
    debit: '',
    credit: '',
    balance: '',
    remarks: ''
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,private authService: Auth, private router: Router) {}


  // 🔹 Apply Column Filters
  applyColumnFilters() {
    this.filteredTransactions = this.transactions.filter(txn => {
      return Object.keys(this.filters).every(key => {
        const filterValue = this.filters[key]?.toLowerCase() || '';
        if (!filterValue) return true; // no filter for this column
        return txn[key]?.toString().toLowerCase().includes(filterValue);
      });
    });
    this.calculateTotals();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // 🔹 File Selected
  onFileSelected(event: any) {
    const selected = event.target.files[0];
    if (!selected) return;

    this.file = selected;

    if (this.selectedBank && this.file) {
      this.extractPdf();
    }
  }

 
// 🔹 When bank is selected
onBankSelected() {
  // ✅ Show password field only for HDFC or SBI
  this.showPasswordField = this.selectedBank === 'HDFC' || this.selectedBank === 'SBI';

  // ✅ Show account type dropdown only for ICICI
  this.showAccountTypeField = this.selectedBank === 'ICICI';

  // ✅ If ICICI requires account type first, wait for user selection
  if (this.selectedBank !== 'ICICI' && this.file) {
    this.extractPdf();
  }
}

  // 🔹 When account type is selected
onAccountSelected(type: string) {
  this.selectAccountType = type;
  console.log('✅ Account Type Selected:', this.selectAccountType);

  // ✅ Trigger extraction only if file & bank are already selected
  if (this.selectedBank && this.selectAccountType && this.file) {
    this.extractPdf();
  }
}

  applyVoucherToFiltered(newValue: string) {
  // Apply value to all filtered rows
  this.filteredTransactions.forEach(txn => {
    txn.voucherType = newValue;
  });

  // Sync with main transactions array
  this.transactions = this.transactions.map(txn => {
    const match = this.filteredTransactions.find(f => f === txn);
    return match ? { ...match } : txn;
  });
}

  // When user edits voucher type in one of the filtered rows
onVoucherEdit(newValue: string) {
  // Apply same value to all filtered rows
  for (let txn of this.filteredTransactions) {
    txn.voucherType = newValue;
  }

  // Update main transactions list
  this.transactions = this.transactions.map(txn => {
    const match = this.filteredTransactions.find(f => f === txn);
    return match ? { ...match } : txn;
  });

  // Reapply filters to refresh visible data
  this.applyColumnFilters();
}


  // 🔹 Extract PDF and Fetch Transactions
  extractPdf() {
    if (!this.selectedBank || !this.file) return;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('bank', this.selectedBank);
    formData.append('accountType',this.selectAccountType);

    if (this.pdfPassword) {
      formData.append('password', this.pdfPassword);
    }

    this.http.post<any>('http://localhost:8080/api/pdf/extracts', formData)
      .subscribe({
        next: (res) => {
          if (res.status === 'success' && res.transactions?.length > 0) {
            this.transactions = [...res.transactions];
            this.filteredTransactions = [...this.transactions]; // ✅ fix: show table immediately
            this.showTable = true;
            this.calculateTotals();
          } else {
            this.transactions = [];
            this.filteredTransactions = [];
            this.showTable = false;
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error:', err);
          this.transactions = [];
          this.filteredTransactions = [];
          this.showTable = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 🔹 Calculate Totals
  calculateTotals() {
    const list = this.filteredTransactions.length ? this.filteredTransactions : this.transactions;

    this.totalDebit = list.reduce((sum, txn) => sum + (Number(txn.debit) || 0), 0);
    this.totalCredit = list.reduce((sum, txn) => sum + (Number(txn.credit) || 0), 0);
    // this.totalAmount = this.totalDebit - this.totalCredit;
  }

 downloadXml() {
  if (!this.selectedBank || !this.transactions || this.transactions.length === 0) return;

  // 🔹 Optional: clear filters on UI before downloading
  this.filters = {};
  this.filteredTransactions = [...this.transactions];

  const formData = new FormData();
  formData.append('bank', this.selectedBank);
  formData.append('bankName', this.typeBank);
  formData.append('tableData', JSON.stringify(this.transactions));

  this.http.post('http://localhost:8080/api/pdf/extract/tallyxml', formData, {
    responseType: 'blob'
  }).subscribe({
    next: (res: Blob) => {
      const blob = new Blob([res], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${this.selectedBank}.xml`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => console.error('XML download error:', err)
  });
}


  // 🔹 Download Excel
  downloadExcel() {
    if (!this.selectedBank || !this.transactions || this.transactions.length === 0) return;

    const formData = new FormData();
    formData.append('bank', this.selectedBank);

    const currentTableData = this.filteredTransactions?.length ? this.filteredTransactions : this.transactions;
 
    formData.append('tableData',JSON.stringify(currentTableData));
    
    this.http.post('http://localhost:8080/api/pdf/download-excel', formData, {
      responseType: 'blob'
    }).subscribe({
      next: (res: Blob) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${this.selectedBank}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Excel download error:', err)
    });
  }
}

