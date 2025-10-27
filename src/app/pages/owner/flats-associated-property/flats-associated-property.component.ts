import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Flat {
  id: number;
  flatNumber: string;
  floor: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  status: 'occupied' | 'available' | 'maintenance';
  type: string; // 1BHK, 2BHK, 3BHK
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  billingType: 'Advance' | 'Monthly';
  monthlyRent: number;
  meteringType: 'Self Pay' | 'Sub-meter';
  subMeterRate?: number;
  createdDate: string;
  tenantName?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
}

interface PropertyMetrics {
  totalFlats: number;
  activeTenants: number;
  allottedFlats: number;
  vacantFlats: number;
  monthlyRevenue: number;
  revenueTrend: number;
  pendingPayments: number;
  paymentTrend: number;
}

@Component({
  selector: 'app-flats-associated-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flats-associated-property.component.html',
  styleUrl: './flats-associated-property.component.scss'
})
export class FlatsAssociatedPropertyComponent {
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedFurnishing: string = 'all';
  selectedAvailable: string = 'all';
  activeTab: string = 'flats';
  
  selectedProperty = {
    id: 1,
    name: 'Sunrise Apartments',
    address: '123 MG Road, Bangalore - 560001'
  };
  
  properties = [
    { id: 1, name: 'Sunrise Apartments', address: '123 MG Road, Bangalore - 560001' },
    { id: 2, name: 'Green Valley Residency', address: '456 Park Street, Mumbai - 400001' },
    { id: 3, name: 'City Center Plaza', address: '789 Brigade Road, Bangalore - 560025' }
  ];
  
  metrics: PropertyMetrics = {
    totalFlats: 40,
    activeTenants: 20,
    allottedFlats: 32,
    vacantFlats: 8,
    monthlyRevenue: 20000,
    revenueTrend: 3,
    pendingPayments: 10000,
    paymentTrend: -3
  };
  
  flats: Flat[] = [
    {
      id: 1,
      flatNumber: 'A-101',
      floor: 1,
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      status: 'occupied',
      type: '2BHK',
      furnishing: 'Semi-Furnished',
      billingType: 'Advance',
      monthlyRent: 25000,
      meteringType: 'Self Pay',
      createdDate: '15 Jan 2024',
      tenantName: 'John Doe',
      leaseStartDate: '2024-01-01',
      leaseEndDate: '2024-12-31'
    },
    {
      id: 2,
      flatNumber: 'A-102',
      floor: 1,
      area: 1000,
      bedrooms: 1,
      bathrooms: 1,
      status: 'available',
      type: '1BHK',
      furnishing: 'Semi-Furnished',
      billingType: 'Advance',
      monthlyRent: 20000,
      meteringType: 'Sub-meter',
      subMeterRate: 8,
      createdDate: '15 Jan 2024'
    },
    {
      id: 3,
      flatNumber: 'A-201',
      floor: 2,
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      status: 'occupied',
      type: '2BHK',
      furnishing: 'Fully Furnished',
      billingType: 'Monthly',
      monthlyRent: 25000,
      meteringType: 'Self Pay',
      createdDate: '15 Jan 2024',
      tenantName: 'Jane Smith',
      leaseStartDate: '2024-02-01',
      leaseEndDate: '2025-01-31'
    },
    {
      id: 4,
      flatNumber: 'A-202',
      floor: 2,
      area: 1000,
      bedrooms: 1,
      bathrooms: 1,
      status: 'available',
      type: '1BHK',
      furnishing: 'Unfurnished',
      billingType: 'Advance',
      monthlyRent: 20000,
      meteringType: 'Sub-meter',
      subMeterRate: 8,
      createdDate: '15 Jan 2024'
    },
    {
      id: 5,
      flatNumber: 'A-301',
      floor: 3,
      area: 1500,
      bedrooms: 3,
      bathrooms: 2,
      status: 'occupied',
      type: '3BHK',
      furnishing: 'Fully Furnished',
      billingType: 'Advance',
      monthlyRent: 35000,
      meteringType: 'Self Pay',
      createdDate: '15 Jan 2024',
      tenantName: 'Mike Johnson',
      leaseStartDate: '2023-12-01',
      leaseEndDate: '2024-11-30'
    },
    {
      id: 6,
      flatNumber: 'A-302',
      floor: 3,
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      status: 'available',
      type: '2BHK',
      furnishing: 'Semi-Furnished',
      billingType: 'Advance',
      monthlyRent: 25000,
      meteringType: 'Sub-meter',
      subMeterRate: 8,
      createdDate: '15 Jan 2024'
    }
  ];

  get filteredFlats(): Flat[] {
    let filtered = this.flats;
    
    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(flat => 
        flat.flatNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        flat.tenantName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(flat => flat.type === this.selectedType);
    }
    
    // Filter by furnishing
    if (this.selectedFurnishing !== 'all') {
      filtered = filtered.filter(flat => flat.furnishing === this.selectedFurnishing);
    }
    
    // Filter by availability
    if (this.selectedAvailable !== 'all') {
      filtered = filtered.filter(flat => flat.status === this.selectedAvailable);
    }
    
    return filtered;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'occupied':
        return 'status-occupied';
      case 'available':
        return 'status-available';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'occupied':
        return 'Occupied';
      case 'available':
        return 'Available';
      case 'maintenance':
        return 'Maintenance';
      default:
        return status;
    }
  }

  onPropertyChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const propertyId = +target.value;
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      this.selectedProperty = property;
    }
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onAddFlat(): void {
    // TODO: Implement add flat functionality
    console.log('Add Flat clicked');
  }

  onEditFlat(flatId: number): void {
    // TODO: Implement edit flat functionality
    console.log('Edit flat clicked for:', flatId);
  }

  onDeleteFlat(flatId: number): void {
    // TODO: Implement delete flat functionality
    console.log('Delete flat clicked for:', flatId);
  }

  onViewDetails(flatId: number): void {
    // TODO: Implement view details functionality
    console.log('View details clicked for:', flatId);
  }
}
