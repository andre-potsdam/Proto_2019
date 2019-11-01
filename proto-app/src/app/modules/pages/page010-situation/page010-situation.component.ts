import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Situation } from 'src/app/shared/api/model/situation.enum';
import { InputConfig } from 'src/app/shared/model/input-config';
import { Language } from 'src/app/shared/model/language.enum';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SituationDataService } from 'src/app/shared/services/situation-data.service';
import { InfoTextGroup } from 'src/app/shared/util/info-text-group';
import { RadioConfig } from './../../../shared/model/radio-config';
import { Page010SituationProperties } from './page010-situation.properties';
import { Page010SituationPropertiesDe } from './page010-situation.properties.de';
import { Page010SituationPropertiesEn } from './page010-situation.properties.en';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';


enum InsuranceBegin {
  BEGIN_0101202 = 'BEGIN_01012020',
  OTHER_DATE = 'OTHER_DATE',
}

@Component({
  selector: 'app-page010-situation',
  templateUrl: './page010-situation.component.html',
  styleUrls: ['./page010-situation.component.css'],
})
export class Page010SituationComponent implements OnInit {

  // language dependent properties
  properties: Page010SituationProperties;

  // config for labels, rendering, select items, ...
  situationGroupConfig: FormGroupConfig;
  situationChoiceConfig: RadioConfig;
  insuranceBeginChoiceConfig: RadioConfig;
  insuranceBeginDateConfig: InputConfig;

  // value and validation
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private situationDataService: SituationDataService) { }

  ngOnInit() {
    this.init();
    this.prepare();
  }


  // Init config data. Invoked once after startup resp. after every language change.
  init() {
    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page010SituationPropertiesEn();
        break;
      }
      default: {
        this.properties = new Page010SituationPropertiesDe();
      }
    }

    this.situationGroupConfig = new FormGroupConfig(
      this.properties.situationGroup_title,
      this.properties.situationGroup_description,
    );

    this.situationChoiceConfig = new RadioConfig(
      'situation',
      this.properties.situationChoice_rowLabel,
      this.properties.situationChoice_infoText,
      true,
      [
        { value: Situation.EXISTING_CAR, label: this.properties.situationChoice_existingCar_label },
        { value: Situation.NEW_CAR, label: this.properties.situationChoice_newCar_label },
      ]
    );

    this.insuranceBeginChoiceConfig = new RadioConfig(
      'insuranceBeginChoice',
      this.properties.insuranceBeginChoice_rowLabel,
      this.properties.insuranceBeginChoice_infoText,
      false,
      [
        { value: InsuranceBegin.BEGIN_0101202, label: this.properties.insuranceBeginChoice_01012020_label },
        { value: InsuranceBegin.OTHER_DATE, label: this.properties.insuranceBeginChoice_anotherDate_label },
      ],
    );

    this.insuranceBeginDateConfig = new InputConfig(
      'insuranceBegin',
      'date',
      this.properties.insuranceBegin_rowLabel,
      this.properties.insuranceBegin_infoText,
      true,
    );

    // ensure, that only one info text is shown
    new InfoTextGroup(this.situationChoiceConfig, this.insuranceBeginChoiceConfig, this.insuranceBeginDateConfig);
  }


  // Prepare view model values. Invoked once after startup.
  prepare() {

    // get situation data from previous session
    let situationData = this.situationDataService.get();
    if (!situationData) {
      // first init
      situationData = {
        situation: Situation.EXISTING_CAR,
        //insuranceBegin: new Date(),   // today
      };
    }

    let insuranceBeginChoice: InsuranceBegin = null;
    if (situationData.insuranceBegin) {
      const d = situationData.insuranceBegin;
      const is01012020 = d.getFullYear() === 2020 && d.getMonth() === 0 && d.getDate() === 1;
      insuranceBeginChoice = is01012020 ? InsuranceBegin.BEGIN_0101202 : InsuranceBegin.OTHER_DATE;
    }

    // prepare forms model
    this.form = this.fb.group({
      situationGroup: this.fb.group({
        situationChoice: [situationData.situation, Validators.required],
        insuranceBeginChoice: [insuranceBeginChoice, Validators.required],
        insuranceBeginDate: [situationData.insuranceBegin],
      })
    });
  }


  isVisibleInsuranceBeginChoice(): boolean {
    return this.form.get('situationGroup.situationChoice').value === Situation.EXISTING_CAR;
  }

  isVisibleInsuranceBeginDate(): boolean {
    return this.isVisibleInsuranceBeginChoice() &&
      this.form.get('situationGroup.insuranceBeginChoice').value === InsuranceBegin.OTHER_DATE;
  }

  onSubmit() {
    console.log('submit ...');
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
  }

  test() {
    console.log('test ...');
    this.configService.toggleLanguage();
    this.init();
  }

}
