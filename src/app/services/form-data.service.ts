import { Injectable } from '@angular/core';
import { FormData } from '../form-data.model';

@Injectable({
    providedIn: 'root'
})
export class FormDataService {
    private formData: FormData = {
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
    highlightedState: string | null = null;

    getFormData(): FormData {
        return this.formData;
    }

    setFormData(data: Partial<FormData>) {
        this.formData = { ...this.formData, ...data };
    }

    getHighlightedState(): string | null {
        return this.highlightedState;
    }

    setHighlightedState(state: string | null) {
        this.highlightedState = state;
    }
}