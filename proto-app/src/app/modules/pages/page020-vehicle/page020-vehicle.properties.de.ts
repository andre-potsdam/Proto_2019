import { Page020VehicleProperties } from './page020-vehicle.properties';

export class Page020VehiclePropertiesDe implements Page020VehicleProperties {

    // page global
    pageHeader = null;


    // vehicle group
    vehicleGroup_title = null;
    vehicleGroup_description = null;


    // manuf year
    manufYear_rowLabel = 'Baujahr';
    manufYear_infoText = 'Das Baujahr Ihres Fahrzeugs';

    // purchase year
    purchaseYear_rowLabel = 'Kaufjahr';
    purchaseYear_infoText = 'In welchem Jahr haben Sie das Fahrzeug erworben?';

    // vehicle selection
    vehicleSelection_rowLabel = 'Wählen Sie Ihr Auto aus';
    vehicleSelection_infoText = '<b>Fahrzeugauswahl</b><br>Entweder über HSN/TSN oder mit Angabe Hersteller/Modell/...';

    vehicleSelection_hsntsn_label = 'Auswahl per Fahrzeugschein';
    vehicleSelection_comfortSearch_label = 'Auswahl mit der Pkw-Komfortsuche';

    // HSN
    hsn_rowLabel = 'HSN';
    hsn_infoText = '<b>HSN</b><br>4-stellige Nummer des Herstellers, s. Kfz Zulassung';
    hsn_formatError = 'Bitte geben Sie eine 4-stellige Zahl ein';

    // TSN
    tsn_rowLabel = 'TSN';
    tsn_infoText = '<b>TSN</b><br>3-stelliger Code für das Fahrzeug, s. Kfz-Zulassung';
    tsn_formatError = 'Bitte geben Sie 3 Buchstaben bzw. Ziffern ein';

    // HSN/TSN
    hsntsn_rowLabel = 'HSN / TSN';

    // manufacturer
    manufacturer_rowLabel = 'Hersteller';
    manufacturer_infoText = 'Auswahl des Fahrzeug Herstellers.';

    // model
    model_rowLabel = 'Modell';
    model_infoText = null;

    // fuel
    fuel_rowLabel = 'Treibstoff';
    fuel_infoText = null;

    fuel_benzin_label = 'Benzin';
    fuel_diesel_label = 'Diesel';

    // financing
    financing_rowLabel = 'Laufende Finanzierung';
    financing_infoText = '<b>Finanzierung</b><br>Finanzieren Sie das Fahrzeug über einen Kredit bzw. Leasing?';

    financing_no_label = 'nein';
    financing_yes_label = 'ja';

    // vehicle description
    vehicleDescription_rowLabel = 'Fahrzeug';


    submitButton_label = 'Weiter';
}
