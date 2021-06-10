import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoguitComponent } from './loguit.component';

describe('LoguitComponent', () => {
  let component: LoguitComponent;
  let fixture: ComponentFixture<LoguitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoguitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoguitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
