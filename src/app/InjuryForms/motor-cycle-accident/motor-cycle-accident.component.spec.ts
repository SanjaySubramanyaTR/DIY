import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorCycleAccidentComponent } from './motor-cycle-accident.component';

describe('MotorCycleAccidentComponent', () => {
  let component: MotorCycleAccidentComponent;
  let fixture: ComponentFixture<MotorCycleAccidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotorCycleAccidentComponent]
    });
    fixture = TestBed.createComponent(MotorCycleAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
