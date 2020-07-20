import { Injectable } from '@angular/core';
import { SituationData } from '../api/model/situation-data';
import { AbstractDataService } from './abstract-data.service';

@Injectable({
  providedIn: 'root'
})
export class SituationDataService extends AbstractDataService<SituationData> {

  constructor() {
    super();
  }

}
