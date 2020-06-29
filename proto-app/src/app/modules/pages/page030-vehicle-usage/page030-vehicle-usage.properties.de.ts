import { Page030VehicleUsageProperties } from './page030-vehicle-usage.properties';

export class Page030VehicleUsagePropertiesDe implements Page030VehicleUsageProperties {

    // page global
    pageHeader = null;

    // vehicle usage group
    vehicleUsageGroup_title = null;
    vehicleUsageGroup_description = null;


    // usage kind
    usageKind_rowLabel = 'Wie nutzen Sie das Fahrzeug?';
    usageKind_infoText = `
        <b>Private oder geschäftliche Nutzung?</b><br>
        Sie nutzen Ihr Auto ausschließlich privat in der Freizeit und für Fahrten zur Arbeit, 
        dann wählen Sie "Privat (inkl. Fahrten zur Arbeit)".
        Sie nutzen Ihr Auto für dienstliche/ geschäftliche Fahrten und in der Freizeit, 
        dann wählen Sie "Geschäftlich und Privat".`;

    usageKind_private_label = 'Privat (inkl. Fahrten zur Arbeit)';
    usageKind_business_label = 'Geschäftlich und Privat';


    // milage
    milage_rowLabel = 'Wie viele Kilometer fahren Sie im Jahr?';
    milage_postfix = '.000 km';
    milage_infoText = '<b>Jahresfahrleistung</b><br>Bitte geben Sie die Jahresfahrleistung nur in Tausender an, also z. B. 20 wenn Sie 20.000 km im Jahr fahren.';


    // season plate choice
    seasonPlateChoice_rowLabel = 'Möchten Sie ein Saisonkennzeichen?';
    seasonPlateChoice_infoText = '<b>Saisonkennzeichen</b><br>Ein Saisonkennzeichen kann für einen Zeitraum von mindestens 1 Monat beantragt werden.';

    seasonPlateChoice_no_label = 'nein';
    seasonPlateChoice_yes_label = 'ja';

    // season plate begin
    seasonPlateBegin_rowLabel = 'von';
    seasonPlateBegin_infoText = null;

    // season plate end
    seasonPlateEnd_rowLabel = 'bis';
    seasonPlateEnd_infoText = null;

    month_1_label = 'Januar';
    month_2_label = 'Februar';
    month_3_label = 'März';
    month_4_label = 'April';
    month_5_label = 'Mai';
    month_6_label = 'Juni';
    month_7_label = 'Juli';
    month_8_label = 'August';
    month_9_label = 'September';
    month_10_label = 'Oktober';
    month_11_label = 'November';
    month_12_label = 'Dezember';

    // home ownership
    homeOwnership_rowLabel = 'Besitzen Sie Wohneigentum?';
    homeOwnership_infoText = null;

    homeOwnership_noInformation_label = 'keine Angabe';
    homeOwnership_noOwnership_label = 'kein Wohneigentum';
    homeOwnership_ownFlat_label = 'Wohnung';
    homeOwnership_ownHouse_label = 'Haus';

    // parking place
    parkingPlace_rowLabel = 'Wo stellen Sie das Fahrzeug überwiegend ab?';
    parkingPlace_infoText = null;

    parkingPlace_garage_label = 'Einzelgarage / Doppelgarage';
    parkingPlace_parkhouse_label = 'Sammel- / Tiefgarage, Parkhaus';
    parkingPlace_street_label = 'Straße, Parkplatz, Sonstiges';
    parkingPlace_carport_label = 'Carport, Privatgrund';


    // submit button
    submitButton_label = 'Weiter';

}
