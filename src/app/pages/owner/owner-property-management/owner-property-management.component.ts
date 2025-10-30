import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  name: string;
  address: string;
  totalFlats: number;
  allottedFlats: number;
  vacantFlats: number;
  registeredDate: string;
}

@Component({
  selector: 'app-owner-property-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-property-management.component.html',
  styleUrl: './owner-property-management.component.scss'
})
export class OwnerPropertyManagementComponent {
  searchTerm: string = '';
  
  properties: Property[] = [
    {
      id: 1,
      name: 'Sunrise Apartments',
      address: '123 MG Road, Bangalore - 560001',
      totalFlats: 36,
      allottedFlats: 32,
      vacantFlats: 4,
      registeredDate: '1/15/2024'
    },
    {
      id: 2,
      name: 'Green Valley Residency',
      address: '456 Park Street, Mumbai - 400001',
      totalFlats: 34,
      allottedFlats: 32,
      vacantFlats: 2,
      registeredDate: '1/15/2024'
    },
    {
      id: 3,
      name: 'City Center Plaza',
      address: '789 Brigade Road, Bangalore - 560025',
      totalFlats: 34,
      allottedFlats: 32,
      vacantFlats: 2,
      registeredDate: '1/15/2024'
    }
  ];

  get filteredProperties(): Property[] {
    if (!this.searchTerm) {
      return this.properties;
    }
    return this.properties.filter(property => 
      property.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onAddProperty(): void {
    // TODO: Implement add property functionality
    console.log('Add Property clicked');
  }

  onPropertyOptions(propertyId: number): void {
    // TODO: Implement property options menu
    console.log('Property options clicked for:', propertyId);
  }
}
