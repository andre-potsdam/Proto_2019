

import {Page020VehicleProperties} from './page020-vehicle.properties';

export class Page020VehiclePropertiesEs implements Page020VehicleProperties {

    // defaults
    private default_requiredError = 'Bitte treffen Sie eine Auswahl';

    // ---------------------------------------

   // page global
    pageHeader = null;


    // vehicle group
    vehicleGroup_title = null;
    vehicleGroup_description = null;


    // manuf year
    manufYear_rowLabel = 'Año de fabricación';
    manufYear_infoText = 'El año de su vehículo';
    manufYear_requiredError = this.default_requiredError;

    // purchase year
    purchaseYear_rowLabel = 'Año de compra';
    purchaseYear_infoText = '¿En qué año compró el vehículo?';
    purchaseYear_requiredError = this.default_requiredError;

    // vehicle selection
    vehicleSelection_rowLabel = 'Seleccione su automóvil';
    vehicleSelection_infoText = '<b> Selección de vehículo </ b> <br> Ya sea a través de HSN / TSN o con Fabricante / Modelo / ...';
    vehicleSelection_requiredError = this.default_requiredError;

    vehicleSelection_hsntsn_label = 'Selección por registro del vehículo';
    vehicleSelection_comfortSearch_label = 'Selección por búsqueda de confort del automóvil';

    // HSN
    hsn_rowLabel = 'HSN';
    hsn_infoText = '<b> HSN </ b> <br> número de fabricante de 4 dígitos, s. Aprobación Kfz ';
    hsn_requiredError = 'Bitte geben Sie eine HSN an';
    hsn_formatError = 'Por favor ingrese un número de 4 dígitos';

    // TSN
    tsn_rowLabel = 'TSN';
    tsn_infoText = '<b> TSN </ b> <br> Código de 3 dígitos para el vehículo, s. el registro del vehículo';
    tsn_requiredError = 'Bitte geben SIe eine TSN an';
    tsn_formatError = 'Por favor ingrese 3 letras o números';

    // HSN / TSN
    hsntsn_rowLabel = 'HSN / TSN';

    // manufacturer
    manufacturer_rowLabel = 'Fabricante';
    manufacturer_infoText = null;
    manufacturer_requiredError = this.default_requiredError;

    // model
    model_rowLabel = 'Modelo';
    model_infoText = null;
    model_requiredError = this.default_requiredError;

    // fuel
    fuel_rowLabel = 'combustible';
    fuel_infoText = null;
    fuel_requiredError = this.default_requiredError;

    fuel_benzin_label = 'gas';
    fuel_diesel_label = 'Diesel';

    // financing
    financing_rowLabel = 'Financiamiento continuo';
    financing_infoText = '<b> Financiación </ b> <br> ¿Está financiando el vehículo mediante un préstamo o arrendamiento?';
    financing_requiredError = this.default_requiredError;

    financing_no_label = 'no';
    financing_yes_label = 'sí';

    // vehicle description
    vehicleDescription_rowLabel = 'Vehículo';


    submitButton_label = 'Siguiente';

    hsnTsnNotFoundError = 'No se encontró ningún vehículo para este HSN / TSN';
}
