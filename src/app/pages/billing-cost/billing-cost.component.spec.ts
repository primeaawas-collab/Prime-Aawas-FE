import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCostComponent } from './billing-cost.component';

describe('BillingCostComponent', () => {
  let component: BillingCostComponent;
  let fixture: ComponentFixture<BillingCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
