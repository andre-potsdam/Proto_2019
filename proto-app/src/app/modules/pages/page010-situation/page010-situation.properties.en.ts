import { Page010SituationProperties } from './page010-situation.properties';

export class Page010SituationPropertiesEn implements Page010SituationProperties {

        // page global
        pageHeader = null;

        // situation group
        situationGroup_title = null;
        situationGroup_description = null;

        // situation choice
        situationChoice_rowLabel = 'Which car shall be calculated?';
        situationChoice_infoText = 'This is important!<br>Take care, please :)';
        situationChoice_existingCar_label = 'for your current car';
        situationChoice_newCar_label = 'for a new car';

        // insurance begin choice
        insuranceBeginChoice_rowLabel = 'insurance begin';
        insuranceBeginChoice_infoText = `Insurance change at 1.1.2020 is possible without contract cancelation.<br>
                                        Every other date is possible as well.`;
        insuranceBeginChoice_01012020_label = '01.01.2020';
        insuranceBeginChoice_anotherDate_label = 'another day';

        // insurance begin date
        insuranceBeginDate_rowLabel = null;
        insuranceBeginDate_infoText = null;

       // submit button
        submitButton_label = 'Proceed';

}
