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
    vehicleSelection_infoText = '<b>Fahrzeugauswahl</b><p></p>Entweder über HSN/TSN oder mit Angabe Hersteller/Modell/...';

    vehicleSelection_hsntsn_label = 'Auswahl per Fahrzeugschein';
    vehicleSelection_comfortSearch_label = 'Auswahl mit der Pkw-Komfortsuche';

    // HSN
    hsn_rowLabel = 'HSN';
    hsn_infoText = '4-stellige Nummer des Herstellers, s. Kfs Zulassung';

    // TSN
    tsn_rowLabel = 'TSN';
    tsn_infoText = '3-stelliger Code für das Fahrzeug, s. Kfz-Zulassung';

    // HSN/TSN
    hsntsn_rowLabel = 'HSN / TSN';

    // manufacturer
    manufacturer_rowLabel = 'Hersteller';
    manufacturer_infoText = null;

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
    financing_infoText = 'Finanzieren Sie das Fahrzeug über einen Kredit bzw. Leasing?';

    financing_no_label = 'nein';
    financing_yes_label = 'ja';

    // vehicle description
    vehicleDescription_rowLabel = 'Fahrzeug';


    submitButton_label = 'Weiter';
}
