import { Financing } from './financing.enum';

export class VehicleData {

    manufYear: number;

    purchaseYear: number;

    hsn: string;

    tsn: string;

    financing: Financing;

    // client side only
    manufacturer: string;

    model: string;
}
