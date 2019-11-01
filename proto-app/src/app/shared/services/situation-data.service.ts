import { Injectable } from '@angular/core';
import { SituationData } from '../api/model/situation-data';
import { Observable } from 'rxjs';
import { ValidationResult } from '../model/validation-result';
import { SituationDataFieldId } from '../api/model/situation-data-field-id.enum';

@Injectable({
  providedIn: 'root'
})
export class SituationDataService {

  constructor() { }

  situationData: SituationData;

  // Get data from service cache, or null.
  get(): SituationData {
    return this.situationData;
  }

  // Save data to service cache and browser persistent storage.
  save(situationData: SituationData) {
    this.situationData = situationData;
  }

  // Validation with backend request.
  validate(situationData: SituationData): Observable<ValidationResult<SituationDataFieldId>> {
    return null;
  }
}
