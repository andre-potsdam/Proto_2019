import { Page020VehicleProperties } from './page020-vehicle.properties';

export class Page020VehiclePropertiesEn implements Page020VehicleProperties {

    // defaults
    private default_requiredError = 'Please make a choice';

    // ---------------------------------------

    // page global
    pageHeader = null;


    // vehicle group
    vehicleGroup_title = null;
    vehicleGroup_description = null;


    // manuf year
    manufYear_rowLabel = 'manufacturing year';
    manufYear_infoText = 'The manufacturing year of your car';
    manufYear_requiredError = this.default_requiredError;

    // purchase year
    purchaseYear_rowLabel = 'purchase year';
    purchaseYear_infoText = 'When did you purchase your car?';
    purchaseYear_requiredError = this.default_requiredError;

    // vehicle selection
    vehicleSelection_rowLabel = 'Select your car';
    vehicleSelection_infoText = '<b>car selection</b><p></p>Either by HSN/TSN or by manufacturer/model/...';
    vehicleSelection_requiredError = this.default_requiredError;

    vehicleSelection_hsntsn_label = 'select with HSN/TSN from Fahrzeugschein';
    vehicleSelection_comfortSearch_label = 'select with comfort search';

    // HSN
    hsn_rowLabel = 'HSN';
    hsn_infoText = '4-digit number of manufacturer, see Kfz Zulassung';
    hsn_requiredError = 'Please provide an HSN';
    hsn_formatError = 'Please enter a 4-digit number';

    // TSN
    tsn_rowLabel = 'TSN';
    tsn_infoText = '3-character Code for your car, see Kfz-Zulassung';
    tsn_requiredError = 'Please provide an TSN';
    tsn_formatError = 'Please enter 3 letters or numbers';

    // HSN/TSN
    hsntsn_rowLabel = 'HSN / TSN';

    // manufacturer
    manufacturer_rowLabel = 'manufacturer';
    manufacturer_infoText = null;
    manufacturer_requiredError = this.default_requiredError;

    // model
    model_rowLabel = 'model';
    model_infoText = null;
    model_requiredError = this.default_requiredError;

    // fuel
    fuel_rowLabel = 'fuel';
    fuel_infoText = null;
    fuel_requiredError = this.default_requiredError;

    fuel_benzin_label = 'Benzin';
    fuel_diesel_label = 'Diesel';

    // financing
    financing_rowLabel = 'active financing';
    financing_infoText = 'Do you have a credit or leasing?';
    financing_requiredError = this.default_requiredError;

    financing_no_label = 'no';
    financing_yes_label = 'yes';

    // vehicle description
    vehicleDescription_rowLabel = 'vehicle';


    submitButton_label = 'Proceed';

    hsnTsnNotFoundError = 'No vehicle found for this HSN/TSN';
}
