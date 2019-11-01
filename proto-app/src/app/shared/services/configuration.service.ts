import { Injectable } from '@angular/core';
import { Language } from '../model/language.enum';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor() { }

    private language = Language.DE;

    getLanguage() {
        return this.language;
    }

    toggleLanguage() {
        if (this.language === Language.DE) {
            this.language = Language.EN;
        } else {
            this.language = Language.DE;
        }
    }
}