import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-provided-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owner-provided-service.component.html',
  styleUrls: ['./owner-provided-service.component.scss'],
})
export class OwnerProvidedServiceComponent implements OnInit {
  @Output() serviceConfigSaved = new EventEmitter<any>();
showInfo: boolean = false;

  serviceForm!: FormGroup;
  savedServices: { name: string; charge: number }[] = [
    { name: 'Wifi', charge: 300 },
    { name: 'Security', charge: 200 },
    { name: 'Maid Service', charge: 500 }
  ];
  editingIndex: number | null = null; // Tracks which row is being edited

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      charge: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addOrUpdateService(): void {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const service = this.serviceForm.value;

    if (this.editingIndex !== null) {
      // Update existing
      this.savedServices[this.editingIndex] = service;
      this.editingIndex = null;
    } else {
      // Add new
      this.savedServices.push(service);
    }

    this.serviceForm.reset({ name: '', charge: 0 });
  }

  editService(index: number): void {
    const selected = this.savedServices[index];
    this.serviceForm.setValue({ name: selected.name, charge: selected.charge });
    this.editingIndex = index;
  }

  deleteService(index: number): void {
    this.savedServices.splice(index, 1);
    // Reset form if currently editing this one
    if (this.editingIndex === index) {
      this.serviceForm.reset({ name: '', charge: 0 });
      this.editingIndex = null;
    }
  }
}
