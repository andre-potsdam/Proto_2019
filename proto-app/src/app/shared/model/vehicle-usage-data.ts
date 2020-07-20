import { VehicleUsageKind } from 'src/app/api/model/VehicleUsageKind';
import { HomeOwnership } from 'src/app/api/model/homeOwnership';
import { ParkingPlace } from 'src/app/api/model/ParkingPlace';

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
