import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormDataService } from '../services/form-data.service';
import { ZipCodeService, ZipCodeRange } from '../services/zipcode.service';
import { FormData } from '../form-data.model';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @Output() nextStep = new EventEmitter<string>();

  formData: FormData;
  injuryTypes = [
    'Auto Accident',
    'Motorcycle Accident',
    'Truck Accident'
  ];
  highlightedState: string | null = null;
  zipCodeRanges: ZipCodeRange[] = [];

  constructor(
    private formDataService: FormDataService,
    private zipCodeService: ZipCodeService
  ) {
    this.formData = this.formDataService.getFormData();
  }

  ngOnInit() {
    this.zipCodeRanges = this.zipCodeService.getZipCodeRanges();
    this.highlightedState = this.formDataService.getHighlightedState();
    if (this.formData.zipCode) {
      this.determineState();
    }
  }

  onContinue() {
    this.formDataService.setFormData(this.formData);
    this.formDataService.setHighlightedState(this.highlightedState);
    console.log('Emitting injury type:', this.formData.injuryType);
    this.nextStep.emit(this.formData.injuryType);
  }

  validateZipCode() {
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    if (!zipCodePattern.test(this.formData.zipCode)) {
      alert('Please enter a valid US zip code (e.g., 12345 or 12345-6789)');
      this.formData.zipCode = '';
      this.highlightedState = null;
      this.formDataService.setHighlightedState(null);
    } else {
      this.determineState();
    }
  }

  determineState() {
    const zipCode = parseInt(this.formData.zipCode.split('-')[0], 10);
    for (const range of this.zipCodeRanges) {
      if (zipCode >= parseInt(range.min, 10) && zipCode <= parseInt(range.max, 10)) {
        this.highlightedState = range.state;
        this.formDataService.setHighlightedState(range.state);
        return;
      }
    }
    this.highlightedState = null;
    this.formDataService.setHighlightedState(null);
  }
}