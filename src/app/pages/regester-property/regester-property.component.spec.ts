import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegesterPropertyComponent } from './regester-property.component';

describe('RegesterPropertyComponent', () => {
  let component: RegesterPropertyComponent;
  let fixture: ComponentFixture<RegesterPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegesterPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegesterPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
