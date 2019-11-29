import { Page010SituationProperties } from './page010-situation.properties';

export class Page010SituationPropertiesDe implements Page010SituationProperties {

        // page global
        pageHeader = null;

        // situation group
        situationGroup_title = null;
        situationGroup_description = null;

        // situation choice
        situationChoice_rowLabel = 'Für welches Fahrzeug möchten Sie den Versicherungsbeitrag berechnen?';
        situationChoice_infoText = `<b>Situation</b><br>
                                        Diese Auswahl ist wichtig!<br>Bitte entscheiden Sie wohl überlegt :)`;
        situationChoice_existingCar_label = 'Für Ihr jetziges Auto';
        situationChoice_newCar_label = 'Für ein Fahrzeug, das Sie kaufen möchten';

        // insurance begin choice
        insuranceBeginChoice_rowLabel = 'Versicherungsbeginn';
        insuranceBeginChoice_infoText = `<b>Versicherungsbeginn</b><br>
                                        Ein Versicherungswechsel zum 1.1.2020 ist ohne Kündigung möglich.<br>
                                        Zu jedem anderen Termin geht es auch.`;
        insuranceBeginChoice_01012020_label = '01.01.2020';
        insuranceBeginChoice_anotherDate_label = 'An einem anderen Datum';

        // insurance begin date
        insuranceBeginDate_rowLabel = null;
        insuranceBeginDate_infoText = null;

       // testSelect
       testSelect_rowLabel = 'testSelect deutsches Label';
       testSelect_infoText = 'testSelect deutscher Info Text';

       // submit button
        submitButton_label = 'Weiter';

}
