import { Injectable } from '@angular/core';
import { zipCodeData } from './zipcodes.data';

export interface ZipCodeRange {
    min: string;
    max: string;
    state: string;
}

@Injectable({
    providedIn: 'root'
})
export class ZipCodeService {
    private zipCodeRanges: ZipCodeRange[] = zipCodeData;

    getZipCodeRanges(): ZipCodeRange[] {
        return this.zipCodeRanges;
    }
}