// Language dependent string values.
// There are implementations for every supported language.
export interface Page020VehicleProperties {

    // page global
    pageHeader: string;


    // vehicle group
    vehicleGroup_title: string;
    vehicleGroup_description: string;


    // manuf year
    manufYear_rowLabel: string;
    manufYear_infoText: string;
    manufYear_requiredError: string;

    // purchase year
    purchaseYear_rowLabel: string;
    purchaseYear_infoText: string;
    purchaseYear_requiredError: string;

    // vehicle selection
    vehicleSelection_rowLabel: string;
    vehicleSelection_infoText: string;
    vehicleSelection_requiredError: string;

    vehicleSelection_hsntsn_label: string;
    vehicleSelection_comfortSearch_label: string;

    // HSN
    hsn_rowLabel: string;
    hsn_infoText: string;
    hsn_requiredError: string;
    hsn_formatError: string;

    // TSN
    tsn_rowLabel: string;
    tsn_infoText: string;
    tsn_requiredError: string;
    tsn_formatError: string;

    // HSN/TSN
    hsntsn_rowLabel: string;

    // manufacturer
    manufacturer_rowLabel: string;
    manufacturer_infoText: string;
    manufacturer_requiredError: string;

    // model
    model_rowLabel: string;
    model_infoText: string;
    model_requiredError: string;

    // fuel
    fuel_rowLabel: string;
    fuel_infoText: string;
    fuel_requiredError: string;

    fuel_benzin_label: string;
    fuel_diesel_label: string;

    // financing
    financing_rowLabel: string;
    financing_infoText: string;
    financing_requiredError: string;

    financing_no_label: string;
    financing_yes_label: string;

    // submit
    submitButton_label: string;


    // vehicle not found by HSN/TSN
    hsnTsnNotFoundError: string;

    // ----- viewer component -----

    // vehicle description
    vehicleDescription_rowLabel: string;

}
