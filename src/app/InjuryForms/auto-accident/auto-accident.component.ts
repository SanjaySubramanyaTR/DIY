import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-accident',
  templateUrl: './auto-accident.component.html',
  styleUrls: ['./auto-accident.component.css']
})
export class AutoAccidentComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  onPrevious() {
    this.previousStep.emit();
  }

  onNext() {
    this.nextStep.emit();
  }
}
