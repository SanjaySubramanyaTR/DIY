import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormData } from '../form-data.model';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Input() formData!: FormData;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();


  constructor(private formDataService: FormDataService) {
    this.formData = this.formDataService.getFormData();
  }

  onContinue() {
    this.nextStep.emit();
  }

  onBack() {
    this.previousStep.emit();
  }
}