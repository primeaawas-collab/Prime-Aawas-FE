import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-provided-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owner-provided-service.component.html',
  styleUrls: ['./owner-provided-service.component.scss']
})
export class OwnerProvidedServiceComponent implements OnInit {
  @Output() serviceConfigSaved = new EventEmitter<any>();

  configForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

 ngOnInit(): void {
  this.configForm = this.fb.group({
    parking: this.fb.group({
      available: [false],
      carCharge: [0],
      bikeCharge: [0]
    }),
    wifi: this.fb.group({
      available: [false],
      charge: [0]
    }),
    maintenance: this.fb.group({
      available: [false],
      charge: [0]
    }),
    water: this.fb.group({
      available: [false],
      charge: [0]
    }),
    electricityRate: [10, [Validators.required, Validators.min(1)]]
  });
}


  save(): void {
    this.serviceConfigSaved.emit(this.configForm.value);
    alert('✅ Service configuration saved!');
  }

  // Convenience getters for cleaner template access
  get parkingGroup(): FormGroup {
    return this.configForm.get('parking') as FormGroup;
  }
  get wifiGroup(): FormGroup {
    return this.configForm.get('wifi') as FormGroup;
  }
  get maintenanceGroup(): FormGroup {
    return this.configForm.get('maintenance') as FormGroup;
  }
  get waterGroup(): FormGroup {
    return this.configForm.get('water') as FormGroup;
  }
  
}
