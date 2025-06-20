import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegesterTenantComponent } from './regester-tenant.component';

describe('RegesterTenantComponent', () => {
  let component: RegesterTenantComponent;
  let fixture: ComponentFixture<RegesterTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegesterTenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegesterTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
