import { HomeOwnership } from './../../../shared/api/model/home-ownership.enum';
import { VehicleUsageKind } from 'src/app/shared/api/model/vehicle-usage-kind.enum';

import { Situation } from 'src/app/shared/api/model/situation.enum';

import { InsuranceBegin } from 'src/app/shared/model/insurance-begin.enum';
import { ParkingPlace } from 'src/app/shared/api/model/parking-place.enum';

export class Page030VehicleUsageStaticData {

  // usage kind
  static usageKindItems = [
    { labelKey: 'usageKind_private_label', value: VehicleUsageKind.PRIVATE },
    { labelKey: 'usageKind_business_label', value: VehicleUsageKind.BUSINESS },
  ];

  // season plate choice
  static seasonPlateChoiceItems = [
    { labelKey: 'seasonPlateChoice_no_label', value: 'false' },
    { labelKey: 'seasonPlateChoice_yes_label', value: 'true' },
  ];

  // season plate begin/end months
  static seasonPlateMonthItems = [
    { labelKey: 'month_1_label', value: '1' },
    { labelKey: 'month_2_label', value: '2' },
    { labelKey: 'month_3_label', value: '3' },
    { labelKey: 'month_4_label', value: '4' },
    { labelKey: 'month_5_label', value: '5' },
    { labelKey: 'month_6_label', value: '6' },
    { labelKey: 'month_7_label', value: '7' },
    { labelKey: 'month_8_label', value: '8' },
    { labelKey: 'month_9_label', value: '9' },
    { labelKey: 'month_10_label', value: '10' },
    { labelKey: 'month_11_label', value: '11' },
    { labelKey: 'month_12_label', value: '12' },
  ];

  // home ownership
  static homeOwnershipItems = [
    { labelKey: 'homeOwnership_noInformation_label', value: HomeOwnership.NO_INFORMATION },
    { labelKey: 'homeOwnership_noOwnership_label', value: HomeOwnership.NO_OWNERSHIP },
    { labelKey: 'homeOwnership_ownFlat_label', value: HomeOwnership.OWN_FLAT },
    { labelKey: 'homeOwnership_ownHouse_label', value: HomeOwnership.OWN_HOUSE },
  ];

  // parking place
  static parkingPlaceItems = [
    { labelKey: 'parkingPlace_garage_label', value: ParkingPlace.GARAGE },
    { labelKey: 'parkingPlace_parkhouse_label', value: ParkingPlace.PARK_HOUSE },
    { labelKey: 'parkingPlace_street_label', value: ParkingPlace.STREET },
    { labelKey: 'parkingPlace_carport_label', value: ParkingPlace.CARPORT },
  ];

}