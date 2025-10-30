import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPropertyManagementComponent } from './owner-property-management.component';

describe('OwnerPropertyManagementComponent', () => {
  let component: OwnerPropertyManagementComponent;
  let fixture: ComponentFixture<OwnerPropertyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerPropertyManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerPropertyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
