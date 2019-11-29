import { Injectable } from '@angular/core';
import { SituationData } from '../api/model/situation-data';
import { Observable } from 'rxjs';
import { ValidationResult } from '../model/validation-result';
import { SituationDataFieldId } from '../api/model/situation-data-field-id.enum';
import { AbstractDataService } from './abstract-data.service';

@Injectable({
  providedIn: 'root'
})
export class SituationDataService extends AbstractDataService<SituationData> {

  constructor() {
    super();
  }

}
