import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { VehicleSearchResponse, VehicleSearchResult } from 'src/app/api';

@Injectable()
export class DemoInterceptor implements HttpInterceptor {

  // demo vehicles, columns: manufacturer, model
  vehicles = [
    ['Audi', 'A4 2.0 TFSI QUATTRO'],
    ['BMW', 'X5 XDRIVE 30D'],
    ['Dacia', 'DACIA DUSTER 1.6'],
    ['Ford', 'FOCUS TURNIER 2.0 TDCI'],
    ['Mazda', 'CX-5 2.2 D AWD'],
    ['Mercedes', 'E 200 T-MODELL 4MATIC'],
    ['Renault', 'CLIO 1.5 DCI'],
    ['Skoda', 'OCTAVIA COMBI 2.0 TSI 4X4'],
    ['Toyota', 'COROLLA STH HYBRID 1.8'],
    ['VW', 'GOLF VII VARIANT 1.5 TSI CNG'],
  ];

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.endsWith('/vehicleSearch')) {
      return this.vehicleSearch(request);
    }
    return next.handle(request);
  }

  // ----- vehicle search -----

  vehicleSearch(request: HttpRequest<unknown>): Observable<HttpResponse<VehicleSearchResponse>> {
    const hsn = request.params.get('hsn');
    const tsn = request.params.get('tsn');
    this.info('vehicleSearch request: hsn=' + hsn + ', tsn=' + tsn);

    let httpResponse = new HttpResponse<VehicleSearchResponse>({
      body: { vehicleSearchResult: this.searchVehicle(hsn, tsn) },
      status: 200
    });

    if (hsn === '0000') {
      // simulate NOT_FOUND
      httpResponse = new HttpResponse<VehicleSearchResponse>({
        body: null,
        status: 404
      });
    }

    return of(httpResponse)
      .pipe(
        tap((response) => this.info('vehicleSearch response: ' + JSON.stringify(response))),
        delay(200));
  }


  searchVehicle(hsn: string, tsn: string): VehicleSearchResult {
    const index = parseInt(hsn.charAt(0), 10);
    const vehicle = this.vehicles[index];

    return {
      manufacturer: vehicle[0],
      model: vehicle[1],
      group: '3',
      riskCategory: '1',
    };
  }



  protected info(s: string): void {
    const c: any = this.constructor;
    console.log(c.name + ': ' + s);
  }
}
