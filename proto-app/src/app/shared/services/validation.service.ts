import { Injectable } from '@angular/core';
import { VehicleData, ValidationError } from '..';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateVehicleData(data: VehicleData): Observable<ValidationError[] | null> {
    return of(null).pipe(
      delay(1000)
    );

    // return of<ValidationError[]>([ { fieldPath: 'vehicle/hsnx', msgId: 'MUL000031', msg: 'Ungültige HSN Nummer' } ]).pipe(
    //   delay(1000)
    // );
  }
}
