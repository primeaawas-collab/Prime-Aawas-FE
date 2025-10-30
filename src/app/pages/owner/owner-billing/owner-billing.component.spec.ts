import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBillingComponent } from './owner-billing.component';

describe('OwnerBillingComponent', () => {
  let component: OwnerBillingComponent;
  let fixture: ComponentFixture<OwnerBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
