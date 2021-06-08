import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdresVragenComponent} from './adres-vragen.component';

describe('AdresVragenComponent', () => {
  let component: AdresVragenComponent;
  let fixture: ComponentFixture<AdresVragenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresVragenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresVragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
