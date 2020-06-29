import { VehicleUsageKind } from './vehicle-usage-kind.enum';
import { HomeOwnership } from './home-ownership.enum';
import { ParkingPlace } from './parking-place.enum';

export class VehicleUsageData {

    // private or busienss usage
    usageKind: VehicleUsageKind;

    // yearly milage in 1000 kilometres
    milage: number;

    // in case of true: special season plate requested
    isSeasonPlate: boolean;

    // 1..12
    seasonPlateBeginMonth?: number;

    // 1..12
    seasonPlateEndMonth?: number;

    homeOwnership: HomeOwnership;

    parkingPlace: ParkingPlace;
}
