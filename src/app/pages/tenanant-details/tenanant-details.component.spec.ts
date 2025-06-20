import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenanantDetailsComponent } from './tenanant-details.component';

describe('TenanantDetailsComponent', () => {
  let component: TenanantDetailsComponent;
  let fixture: ComponentFixture<TenanantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenanantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenanantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
