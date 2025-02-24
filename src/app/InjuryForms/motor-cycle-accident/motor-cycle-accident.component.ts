import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-motor-cycle-accident',
  templateUrl: './motor-cycle-accident.component.html',
  styleUrls: ['./motor-cycle-accident.component.css']
})
export class MotorCycleAccidentComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  onPrevious() {
    this.previousStep.emit();
  }

  onNext() {
    this.nextStep.emit();
  }

}
