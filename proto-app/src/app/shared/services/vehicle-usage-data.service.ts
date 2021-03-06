import { Injectable } from '@angular/core';
import { VehicleUsageData } from '../model/vehicle-usage-data';
import { AbstractDataService } from './abstract-data.service';

@Injectable({
    providedIn: 'root'
}) export class VehicleUsageDataService extends AbstractDataService<VehicleUsageData> {

    constructor() {
        super();
    }
}
