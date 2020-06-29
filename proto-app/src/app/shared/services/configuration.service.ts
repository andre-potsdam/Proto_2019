import { Injectable } from '@angular/core';
import { Language } from '../model/language.enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor() { }

    readonly languageSubject = new Subject<Language>();

    private language = Language.DE;

    getLanguage() {
        return this.language;
    }

    toggleLanguage() {
        if (this.language === Language.DE) {
            this.language = Language.EN;
        } else if (this.language === Language.EN) {
            this.language = Language.ES;
        } else {
            this.language = Language.DE;
        }
        this.languageSubject.next(this.language);
    }
}
