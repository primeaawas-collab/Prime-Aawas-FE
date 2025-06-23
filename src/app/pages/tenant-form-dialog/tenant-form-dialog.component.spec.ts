import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantFormDialogComponent } from './tenant-form-dialog.component';

describe('TenantFormDialogComponent', () => {
  let component: TenantFormDialogComponent;
  let fixture: ComponentFixture<TenantFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
