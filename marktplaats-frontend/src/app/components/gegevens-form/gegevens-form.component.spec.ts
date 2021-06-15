import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GegevensFormComponent } from './gegevens-form.component';

describe('GegevensFormComponent', () => {
  let component: GegevensFormComponent;
  let fixture: ComponentFixture<GegevensFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GegevensFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GegevensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
