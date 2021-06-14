import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertentieFormComponent } from './advertentie-form.component';

describe('AdvertentieFormComponent', () => {
  let component: AdvertentieFormComponent;
  let fixture: ComponentFixture<AdvertentieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertentieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertentieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
