import { AbstractDataService } from './abstract-data.service';
import { VehicleData } from '../api/model/vehicle-data';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })export class VehicleDataService extends AbstractDataService<VehicleData> {

    constructor() {
        super();
    }
}
