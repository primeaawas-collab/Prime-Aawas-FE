import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coverage-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coverage-section.component.html',
  styleUrl: './coverage-section.component.scss'
})
export class CoverageSectionComponent {
  partners = [
    { name: 'Yahoo!', logo: 'yahoo' },
    { name: 'Fundera', logo: 'fundera' },
    { name: 'Merchant Maverick', logo: 'merchant-maverick' }
  ];
}

