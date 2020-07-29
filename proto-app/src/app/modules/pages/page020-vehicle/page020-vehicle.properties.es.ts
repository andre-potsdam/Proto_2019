

import {Page020VehicleProperties} from './page020-vehicle.properties';

export class Page020VehiclePropertiesEs implements Page020VehicleProperties {

    // página global
    pageHeader = null;


    // grupo de vehículos
    vehicleGroup_title = null;
    vehicleGroup_description = null;


    // año de fabricación
    manufYear_rowLabel = 'Año de fabricación';
    manufYear_infoText = 'El año de su vehículo';

    // año de compra
    purchaseYear_rowLabel = 'Año de compra';
    purchaseYear_infoText = '¿En qué año compró el vehículo?';

    // selección del vehículo
    vehicleSelection_rowLabel = 'Seleccione su automóvil';
    vehicleSelection_infoText = '<b> Selección de vehículo </ b> <br> Ya sea a través de HSN / TSN o con Fabricante / Modelo / ...';

    vehicleSelection_hsntsn_label = 'Selección por registro del vehículo';
    vehicleSelection_comfortSearch_label = 'Selección por búsqueda de confort del automóvil';

    // HSN
    hsn_rowLabel = 'HSN';
    hsn_infoText = '<b> HSN </ b> <br> número de fabricante de 4 dígitos, s. Aprobación Kfz ';
    hsn_formatError = 'Por favor ingrese un número de 4 dígitos';

    // TSN
    tsn_rowLabel = 'TSN';
    tsn_infoText = '<b> TSN </ b> <br> Código de 3 dígitos para el vehículo, s. el registro del vehículo';
    tsn_formatError = 'Por favor ingrese 3 letras o números';

    // HSN / TSN
    hsntsn_rowLabel = 'HSN / TSN';

    // fabricante
    manufacturer_rowLabel = 'Fabricante';
    manufacturer_infoText = null;

    // modelo
    model_rowLabel = 'Modelo';
    model_infoText = null;

    // combustible
    fuel_rowLabel = 'combustible';
    fuel_infoText = null;

    fuel_benzin_label = 'gas';
    fuel_diesel_label = 'Diesel';

    // financiación
    financing_rowLabel = 'Financiamiento continuo';
    financing_infoText = '<b> Financiación </ b> <br> ¿Está financiando el vehículo mediante un préstamo o arrendamiento?';

    financing_no_label = 'no';
    financing_yes_label = 'sí';

    // descripción del vehículo
    vehicleDescription_rowLabel = 'Vehículo';


    submitButton_label = 'Siguiente';
}
