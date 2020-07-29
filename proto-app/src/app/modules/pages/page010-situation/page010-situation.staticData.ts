import { SituationType } from 'src/app/api/model/situationType';
import { InsuranceBegin } from 'src/app/shared';

export class Page010SituationStaticData {

  // situation
  static situationItems = [
    { labelKey: 'situationChoice_existingCar_label', value: SituationType.EXISTING_CAR },
    { labelKey: 'situationChoice_newCar_label', value: SituationType.NEW_CAR },
  ];

  // insurance begin choice
  static insuranceBeginChoiceItems = [
    { labelKey: 'insuranceBeginChoice_01012020_label', value: InsuranceBegin.BEGIN_01012020 },
    { labelKey: 'insuranceBeginChoice_anotherDate_label', value: InsuranceBegin.OTHER_DATE },
    ];
}
