import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProvidedServiceComponent } from './owner-provided-service.component';

describe('OwnerProvidedServiceComponent', () => {
  let component: OwnerProvidedServiceComponent;
  let fixture: ComponentFixture<OwnerProvidedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerProvidedServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerProvidedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
