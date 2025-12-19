import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-samples',
  imports: [CommonModule],
  templateUrl: './samples.html',
  styleUrl: './samples.css'
})
export class Samples {

sampleImages: string[] = [
    'assets/samples/canarabank-1.jpg',
    'assets/samples/indianbank-1.jpg',
    'assets/samples/icicibank-1.jpg',
    'assets/samples/federalbank-1.jpg',
    'assets/samples/cubank-1.jpg',
    'assets/samples/sbi-1.jpg',

  ];

}
