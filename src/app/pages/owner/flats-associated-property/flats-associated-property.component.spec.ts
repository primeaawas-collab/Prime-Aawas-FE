import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsAssociatedPropertyComponent } from './flats-associated-property.component';

describe('FlatsAssociatedPropertyComponent', () => {
  let component: FlatsAssociatedPropertyComponent;
  let fixture: ComponentFixture<FlatsAssociatedPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatsAssociatedPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatsAssociatedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
