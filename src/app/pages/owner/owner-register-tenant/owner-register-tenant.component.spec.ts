import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRegisterTenantComponent } from './owner-register-tenant.component';

describe('OwnerRegisterTenantComponent', () => {
  let component: OwnerRegisterTenantComponent;
  let fixture: ComponentFixture<OwnerRegisterTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerRegisterTenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerRegisterTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
