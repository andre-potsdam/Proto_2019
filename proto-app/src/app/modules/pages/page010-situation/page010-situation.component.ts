import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SituationType } from 'src/app/api';
import { FormGroupConfig, InputConfig, RadioConfig } from 'src/app/common';
import { AbstractDataEditor, ConfigGroup, ConfigurationService, InsuranceBegin, Language, SituationData, SituationDataService } from 'src/app/shared';
import { Page010SituationProperties } from './page010-situation.properties';
import { Page010SituationPropertiesDe } from './page010-situation.properties.de';
import { Page010SituationPropertiesEn } from './page010-situation.properties.en';
import { Page010SituationPropertiesEs } from './page010-situation.properties.es';
import { Page010SituationStaticData } from './page010-situation.staticData';


@Component({
  selector: 'app-page010-situation',
  templateUrl: './page010-situation.component.html',
  styleUrls: ['./page010-situation.component.scss'],
})
export class Page010SituationComponent extends AbstractDataEditor<SituationData> {

  // language dependent properties
  properties: Page010SituationProperties;

  // config for labels, rendering, select items, ...
  situationGroupConfig: FormGroupConfig;
  situationChoiceConfig: RadioConfig;
  insuranceBeginChoiceConfig: RadioConfig;
  insuranceBeginDateConfig: InputConfig;
  configGroup: ConfigGroup;

  // reactive form controls for value and validation
  form: FormGroup;
  situationChoiceControl: FormControl;
  insuranceBeginChoiceControl: FormControl;
  insuranceBeginDateControl: FormControl;


  constructor(
    configService: ConfigurationService,
    situationDataService: SituationDataService) {
    super(configService, situationDataService);
  }


  // @override
  protected initConfigs() {

    this.situationGroupConfig = new FormGroupConfig('situationGroup');

    this.situationChoiceConfig = new RadioConfig('situationChoice', true, Page010SituationStaticData.situationItems);
    this.insuranceBeginChoiceConfig = new RadioConfig('insuranceBeginChoice', false, Page010SituationStaticData.insuranceBeginChoiceItems);
    this.insuranceBeginDateConfig = new InputConfig('insuranceBeginDate', 'date', false);

    // ensure, that only one info text is shown
    this.configGroup = new ConfigGroup(
      this.situationChoiceConfig, this.insuranceBeginChoiceConfig, this.insuranceBeginDateConfig);
  }


  // @override
  protected initFormControls() {

    // prepare forms model
    this.situationChoiceControl = new FormControl('', Validators.required);
    this.insuranceBeginChoiceControl = new FormControl();
    this.insuranceBeginDateControl = new FormControl();

    this.form = new FormGroup({
      situationGroup: new FormGroup({
        situationChoice: this.situationChoiceControl,
        insuranceBeginChoice: this.insuranceBeginChoiceControl,
        insuranceBeginDate: this.insuranceBeginDateControl,
      }, this.createValidator(this))
    });
  }


  // @override
  protected updateConfigs() { }


  // @override
  createDefaultData(): SituationData {

    return {
      situation: SituationType.EXISTING_CAR,
      insuranceBegin: moment().add(1, 'd'),   // tomorrow
    };
  }


  // @override
  protected setData(situationData: SituationData) {

    // situationChoice
    this.situationChoiceControl.setValue(situationData.situation);

    // insuranceBeginChoice
    let insuranceBeginChoice: InsuranceBegin = null;
    if (situationData.insuranceBegin) {
      if (situationData.insuranceBegin.isSame('2020-01-01')) {
        insuranceBeginChoice = InsuranceBegin.BEGIN_01012020;
      } else {
        insuranceBeginChoice = InsuranceBegin.OTHER_DATE;
      }
    }
    this.insuranceBeginChoiceControl.setValue(insuranceBeginChoice);

    // insuranceBeginDate
    if (situationData.insuranceBegin) {
      this.insuranceBeginDateControl.setValue(
        situationData.insuranceBegin.format('YYYY-MM-DD')
      );
    }
  }


  // Get service data from view model.
  protected getData(): SituationData {

    // situation

    // (optional) insurance begin
    let insuranceBegin: moment.Moment = null;
    if (this.isVisibleInsuranceBeginChoice()) {
      if (this.insuranceBeginChoiceControl.value === InsuranceBegin.BEGIN_01012020) {
        insuranceBegin = moment('01.01.2020', 'DD.MM.YYYY');
      } else {
        insuranceBegin = moment(this.insuranceBeginDateControl.value, 'YYYY-MM-DD');
      }
    }

    const data: SituationData = {
      situation: this.situationChoiceControl.value,
      insuranceBegin: insuranceBegin,
    };

    return data;
  }


  // @override
  protected updateLanguageStrings() {

    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page010SituationPropertiesEn();
        break;
      }
      case Language.ES: {
        this.properties = new Page010SituationPropertiesEs();
        break;
      }
      default: {
        this.properties = new Page010SituationPropertiesDe();
      }
    }

    this.situationGroupConfig.updateLanguageStrings(this.properties);
    this.configGroup.updateLanguageStrings(this.properties);
  }


  isVisibleInsuranceBeginChoice(): boolean {
    return this.situationChoiceControl && this.situationChoiceControl.value === SituationType.EXISTING_CAR;
  }

  isVisibleInsuranceBeginDate(): boolean {
    return this.isVisibleInsuranceBeginChoice() &&
      this.insuranceBeginChoiceControl.value === InsuranceBegin.OTHER_DATE;
  }


  // @override
  validate() {
    // this.info('enter validate()');

    if (!this.form) {
      return;
    }

    // insurance begin choice
    let control = this.insuranceBeginChoiceControl;
    if (!this.isVisibleInsuranceBeginChoice()) {
      control.setErrors(null);
    } else {
      if (control.value == null) {
        control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
      }
    }

    // insuranceBeginDate
    control = this.insuranceBeginDateControl;
    if (!this.isVisibleInsuranceBeginDate()) {
      control.setErrors(null);
    } else {
      if (!control.value) {
        control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
      }
    }
  }


  onSubmit() {
    this.confirm(this.form);
  }
}

