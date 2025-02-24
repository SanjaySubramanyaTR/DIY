import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-truck-accident',
  templateUrl: './truck-accident.component.html',
  styleUrls: ['./truck-accident.component.css']
})
export class TruckAccidentComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  onPrevious() {
    this.previousStep.emit();
  }

  onNext() {
    this.nextStep.emit();
  }

}
