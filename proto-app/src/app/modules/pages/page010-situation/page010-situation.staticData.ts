import { Situation } from 'src/app/shared/api/model/situation.enum';
import { InsuranceBegin } from 'src/app/shared/model/insurance-begin.enum';

export class Page010SituationStaticData {

  // situation
  static situationItems = [
    { labelKey: 'situationChoice_existingCar_label', value: Situation.EXISTING_CAR },
    { labelKey: 'situationChoice_newCar_label', value: Situation.NEW_CAR },
  ];

  // insurance begin choice
  static insuranceBeginChoiceItems = [
    { labelKey: 'insuranceBeginChoice_01012020_label', value: InsuranceBegin.BEGIN_01012020 },
    { labelKey: 'insuranceBeginChoice_anotherDate_label', value: InsuranceBegin.OTHER_DATE },
    ];
}
