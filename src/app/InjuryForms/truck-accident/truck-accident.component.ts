import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/form-data.model';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-truck-accident',
  templateUrl: './truck-accident.component.html',
  styleUrls: ['./truck-accident.component.css']
})
export class TruckAccidentComponent implements OnInit {

  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  accidentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private formDataService: FormDataService) {
    this.accidentForm = this.fb.group({
      incidentDate: ['', Validators.required],
      fault: ['', Validators.required],
      injured: ['', Validators.required],
      insurance: ['', Validators.required],
      attorney: ['', Validators.required],
      treatment: ['', Validators.required],
      injuries: this.fb.group({
        whiplash: false,
        lostLimb: false,
        brainInjury: false,
        brokenBones: false,
        spinalCord: false,
        lossOfLife: false
      }, { validators: this.atLeastOneInjurySelected }),
      state: ['', Validators.required],
      city: ['', Validators.required],
      medicalBills: ['', Validators.required],
      injuryDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
    const savedData = this.formDataService.getFormData();
    console.log('Saved data:', savedData);
    this.patchFormWithSavedData(savedData);
  }

  private saveFormData() {
    const formValue = this.accidentForm.value;
    console.log('Saving form data:', formValue);
    this.formDataService.setFormData(formValue);
  }

  private patchFormWithSavedData(savedData: FormData) {
    if (savedData) {
      this.accidentForm.patchValue({
        incidentDate: savedData.incidentDate,
        fault: savedData.fault,
        injured: savedData.injured,
        insurance: savedData.insurance,
        attorney: savedData.attorney,
        treatment: savedData.treatment,
        injuries: savedData.injuries,
        state: savedData.state,
        city: savedData.city,
        medicalBills: savedData.medicalBills,
        injuryDescription: savedData.injuryDescription
      });
    }
  }

  onPrevious() {
    this.saveFormData();
    this.previousStep.emit();
  }

  onNext() {
    if (this.accidentForm.valid) {
      this.saveFormData();
      this.nextStep.emit();
    } else {
      this.markFormGroupTouched(this.accidentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private atLeastOneInjurySelected(group: FormGroup): { [key: string]: any } | null {
    const injuries = Object.values(group.value);
    return injuries.some(injury => injury === true) ? null : { noInjurySelected: true };
  }

}
