import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  step1Form: FormGroup;
  injuryTypes = [
    'Auto Accident',
    'Motorcycle Accident',
    'Truck Accident'
  ];
  highlightedState: string | null = null;
  zipCodeRanges: ZipCodeRange[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formDataService: FormDataService,
    private zipCodeService: ZipCodeService
  ) {
    this.step1Form = this.formBuilder.group({
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      injuryType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.zipCodeRanges = this.zipCodeService.getZipCodeRanges();
    this.highlightedState = this.formDataService.getHighlightedState();
    const savedFormData = this.formDataService.getFormData();
    if (savedFormData.zipCode) {
      this.step1Form.patchValue(savedFormData);
      this.determineState();
    }
  }

  onContinue() {
    if (this.step1Form.valid) {
      const formData: FormData = this.step1Form.value;
      this.formDataService.setFormData(formData);
      this.formDataService.setHighlightedState(this.highlightedState);
      console.log('Emitting injury type:', formData.injuryType);
      this.nextStep.emit(formData.injuryType);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.step1Form.controls).forEach(key => {
        const control = this.step1Form.get(key);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  validateZipCode() {
    const zipCodeControl = this.step1Form.get('zipCode');
    if (zipCodeControl && zipCodeControl.valid) {
      this.determineState();
    } else {
      this.highlightedState = null;
      this.formDataService.setHighlightedState(null);
    }
  }

  determineState() {
    const zipCode = parseInt(this.step1Form.get('zipCode')?.value.split('-')[0], 10);
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