import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Transaction {
  transactionDate: string;
  valueDate: string;
  chequeNo: string;
  branch: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
  voucherName: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-data.html',
  styleUrls: ['./table-data.css']
})
export class TableData implements OnChanges {
  @Input() transactions: Transaction[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  totalAmount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions'] && this.transactions.length > 0) {
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.totalDebit = this.transactions.reduce((sum, txn) => sum + (Number(txn.debit) || 0), 0);
    this.totalCredit = this.transactions.reduce((sum, txn) => sum + (Number(txn.credit) || 0), 0);
    this.totalAmount = this.totalDebit - this.totalCredit;
  }
}
