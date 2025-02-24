import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckAccidentComponent } from './truck-accident.component';

describe('TruckAccidentComponent', () => {
  let component: TruckAccidentComponent;
  let fixture: ComponentFixture<TruckAccidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruckAccidentComponent]
    });
    fixture = TestBed.createComponent(TruckAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
