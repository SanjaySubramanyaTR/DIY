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
        comments: ''
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