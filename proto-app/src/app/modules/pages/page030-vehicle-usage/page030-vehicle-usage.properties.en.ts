import { Page030VehicleUsageProperties } from './page030-vehicle-usage.properties';

export class Page030VehicleUsagePropertiesEn implements Page030VehicleUsageProperties {

    // page global
    pageHeader = null;

    // vehicle usage group
    vehicleUsageGroup_title = null;
    vehicleUsageGroup_description = null;


    // usage kind
    usageKind_rowLabel = 'How do you use this car?';
    usageKind_infoText = `
        <b>Private or business use?</b><br>
        In case of private use only choose "private".
        Otherwise choose "business and private".`;

    usageKind_private_label = 'private (incl. driving to work)';
    usageKind_business_label = 'business and private';


    // milage
    milage_rowLabel = 'How much kilometers do you drive per year?';
    milage_postfix = '.000 km';
    milage_infoText = 'Yearly milage needs to be in thousand kilometers, e.g. "20" in case of 20000km.';


    // season plate choice
    seasonPlateChoice_rowLabel = 'Do you need a season plate?';
    seasonPlateChoice_infoText = 'Season plate covers at least one month.';

    seasonPlateChoice_no_label = 'no';
    seasonPlateChoice_yes_label = 'yes';

    // season plate begin
    seasonPlateBegin_rowLabel = 'from';
    seasonPlateBegin_infoText = null;

    // season plate end
    seasonPlateEnd_rowLabel = 'until';
    seasonPlateEnd_infoText = null;

    month_1_label = 'january';
    month_2_label = 'february';
    month_3_label = 'march';
    month_4_label = 'april';
    month_5_label = 'may';
    month_6_label = 'june';
    month_7_label = 'july';
    month_8_label = 'august';
    month_9_label = 'september';
    month_10_label = 'october';
    month_11_label = 'november';
    month_12_label = 'december';

    // home ownership
    homeOwnership_rowLabel = 'Do you have home ownership?';
    homeOwnership_infoText = null;

    homeOwnership_noInformation_label = 'no comment';
    homeOwnership_noOwnership_label = 'no ownership';
    homeOwnership_ownFlat_label = 'flat';
    homeOwnership_ownHouse_label = 'house';


    // parking place
    parkingPlace_rowLabel = 'Where is your parking place?';
    parkingPlace_infoText = null;

    parkingPlace_garage_label = 'separate garage';
    parkingPlace_parkhouse_label = 'public garage, car park';
    parkingPlace_street_label = 'street, etc.';
    parkingPlace_carport_label = 'carport, private ground';


    // submit button
    submitButton_label = 'Proceed';

}
