import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvertentieComponent} from './advertentie.component';

describe('AdvertentieComponent', () => {
  let component: AdvertentieComponent;
  let fixture: ComponentFixture<AdvertentieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertentieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertentieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
