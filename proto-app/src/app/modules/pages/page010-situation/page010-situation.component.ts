import { Component, ModuleWithComponentFactories } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Situation } from 'src/app/shared/api/model/situation.enum';
import { AbstractDataEditor } from 'src/app/shared/classes/abstract-data-editor';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';
import { InputConfig } from 'src/app/shared/model/input-config';
import { Language } from 'src/app/shared/model/language.enum';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SituationDataService } from 'src/app/shared/services/situation-data.service';
import { ConfigGroup } from 'src/app/shared/model/config-group';
import { SituationData } from './../../../shared/api/model/situation-data';
import { RadioConfig } from './../../../shared/model/radio-config';
import { Page010SituationProperties } from './page010-situation.properties';
import { Page010SituationPropertiesDe } from './page010-situation.properties.de';
import { Page010SituationPropertiesEn } from './page010-situation.properties.en';
import { Page010SituationStaticData } from './page010-situation.staticData';
import { InsuranceBegin } from 'src/app/shared/model/insurance-begin.enum';
import * as moment from 'moment';
import { Page010SituationPropertiesEs } from './page010-situation.properties.es';


@Component({
  selector: 'app-page010-situation',
  templateUrl: './page010-situation.component.html',
  styleUrls: ['./page010-situation.component.css'],
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
      situation: Situation.EXISTING_CAR,
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
    return this.situationChoiceControl && this.situationChoiceControl.value === Situation.EXISTING_CAR;
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

