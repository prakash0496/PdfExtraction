import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { PdfExtract } from './pdf-extract/pdf-extract';
import { TableData } from './table-data/table-data';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, PdfExtract, TableData, HttpClientModule,RouterOutlet], // ✅ RouterOutlet removed
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('PdfExtract');
}
