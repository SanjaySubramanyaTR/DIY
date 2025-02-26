export class FormData {
    // Existing fields
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    phone: string = '';
    occupation: string = '';
    comments: string = '';
    injuryType: string = '';

    // New fields for auto accident form
    incidentDate: string = '';
    fault: string = '';
    injured: string = '';
    insurance: string = '';
    attorney: string = '';
    treatment: string = '';
    injuries: {
        whiplash: boolean;
        lostLimb: boolean;
        brainInjury: boolean;
        brokenBones: boolean;
        spinalCord: boolean;
        lossOfLife: boolean;
    } = {
            whiplash: false,
            lostLimb: false,
            brainInjury: false,
            brokenBones: false,
            spinalCord: false,
            lossOfLife: false
        };
    accidentState: string = '';
    accidentCity: string = '';
    medicalBills: string = '';
    injuryDescription: string = '';
}