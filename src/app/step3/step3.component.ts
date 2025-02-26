import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormData } from '../form-data.model';
import { FormDataService } from '../services/form-data.service';


@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component {
  @Input() formData!: FormData;
  @Output() previousStep = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private formDataService: FormDataService) {
    this.formData = this.formDataService.getFormData();
  }

  ngOnInit() {
    if (!this.formData) {
      this.formData = {
        zipCode: '',
        injuryType: '',
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        phone: '',
        occupation: '',
        comments: '',
        incidentDate: '',
        fault: '',
        injured: '',
        insurance: '',
        attorney: '',
        treatment: '',
        injuries: {
          whiplash: false,
          lostLimb: false,
          brainInjury: false,
          brokenBones: false,
          spinalCord: false,
          lossOfLife: false
        },
        accidentState: '',
        accidentCity: '',  // Add this
        medicalBills: '',  // Add this
        injuryDescription: ''  // Add this
      };
    }
  }

  onBack() {
    this.previousStep.emit();
  }

  onSubmit() {
    this.formSubmit.emit();
  }
}