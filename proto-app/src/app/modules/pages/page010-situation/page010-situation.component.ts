import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Situation } from 'src/app/shared/api/model/situation.enum';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';
import { InputConfig } from 'src/app/shared/model/input-config';
import { Language } from 'src/app/shared/model/language.enum';
import { SelectConfig } from 'src/app/shared/model/select-config';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SituationDataService } from 'src/app/shared/services/situation-data.service';
import { ConfigGroup } from 'src/app/shared/util/config-group';
import { RadioConfig } from './../../../shared/model/radio-config';
import { Page010SituationProperties } from './page010-situation.properties';
import { Page010SituationPropertiesDe } from './page010-situation.properties.de';
import { Page010SituationPropertiesEn } from './page010-situation.properties.en';


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
  testSelectConfig: SelectConfig;
  configGroup: ConfigGroup;

  // reactive form controls for value and validation
  form: FormGroup;
  situationChoiceControl: FormControl;
  insuranceBeginChoiceControl: FormControl;
  insuranceBeginDateControl: FormControl;
  testSelectControl: FormControl;


  constructor(
    private configService: ConfigurationService,
    private situationDataService: SituationDataService) { }


  ngOnInit() {
    this.initConfig();
    this.updateLanguageStrings();
    this.initControl();
    this.updateValues();
  }


  // Init config data. Invoked once after startup.
  private initConfig() {

    this.situationGroupConfig = new FormGroupConfig('situationGroup');

    this.situationChoiceConfig = new RadioConfig(
      'situationChoice',
      true,
      [{ value: Situation.EXISTING_CAR, labelKey: 'situationChoice_existingCar_label' },
      { value: Situation.NEW_CAR, labelKey: 'situationChoice_newCar_label' },
      ]);

    this.insuranceBeginChoiceConfig = new RadioConfig(
      'insuranceBeginChoice',
      false,
      [{ value: InsuranceBegin.BEGIN_0101202, labelKey: 'insuranceBeginChoice_01012020_label' },
      { value: InsuranceBegin.OTHER_DATE, labelKey: 'insuranceBeginChoice_anotherDate_label' },
      ]);

    this.insuranceBeginDateConfig = new InputConfig(
      'insuranceBeginDate', 'date', false,
    );

    this.testSelectConfig = new SelectConfig(
      'testSelect', false,
      [{ value: Situation.EXISTING_CAR, labelKey: 'situationChoice_existingCar_label' },
      { value: Situation.NEW_CAR, labelKey: 'situationChoice_newCar_label' },
      { value: 'value3', label: 'label 3' },
      { value: 'value4', label: 'label 4' },
      ]
    );

    // ensure, that only one info text is shown
    this.configGroup = new ConfigGroup(
      this.situationChoiceConfig, this.insuranceBeginChoiceConfig, this.insuranceBeginDateConfig, this.testSelectConfig);
  }


  // Update dynamic configuration, e.g. select item lists.
  updateConfig() { }


  // Update language dependent config data, invoked after every language change.
  updateLanguageStrings() {
    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page010SituationPropertiesEn();
        break;
      }
      default: {
        this.properties = new Page010SituationPropertiesDe();
      }
    }

    this.situationGroupConfig.updateLanguageStrings(this.properties);
    this.situationChoiceConfig.updateLanguageStrings(this.properties);
    this.insuranceBeginChoiceConfig.updateLanguageStrings(this.properties);
    this.insuranceBeginDateConfig.updateLanguageStrings(this.properties);
    this.testSelectConfig.updateLanguageStrings(this.properties);
  }


  // Init form controls. Invoked once after startup.
  private initControl() {

    // prepare forms model
    this.situationChoiceControl = new FormControl(Validators.required);
    this.insuranceBeginChoiceControl = new FormControl();
    this.insuranceBeginDateControl = new FormControl();
    this.testSelectControl = new FormControl(Validators.required);

    this.form = new FormGroup({
      situationGroup: new FormGroup({
        situationChoice: this.situationChoiceControl,
        insuranceBeginChoice: this.insuranceBeginChoiceControl,
        insuranceBeginDate: this.insuranceBeginDateControl,
        testSelect: this.testSelectControl,
      }, this.createValidator(this))
    });
  }


  // Update view model values. Invoked after every value change.
  updateValues() {
    // get situation data from previous session
    let situationData = this.situationDataService.get();
    if (!situationData) {
      // first init
      situationData = {
        situation: Situation.EXISTING_CAR,
        // insuranceBegin: new Date(),   // today
      };
    }

    // situationChoice
    this.situationChoiceControl.setValue(situationData.situation);

    // insuranceBeginChoice
    let insuranceBeginChoice: InsuranceBegin = null;
    if (situationData.insuranceBegin) {
      const d = situationData.insuranceBegin;
      const is01012020 = d.getFullYear() === 2020 && d.getMonth() === 0 && d.getDate() === 1;
      insuranceBeginChoice = is01012020 ? InsuranceBegin.BEGIN_0101202 : InsuranceBegin.OTHER_DATE;
    }
    this.insuranceBeginChoiceControl.setValue(insuranceBeginChoice);

    // insuranceBeginDate
    this.insuranceBeginDateControl.setValue(situationData.insuranceBegin);

    // testSelect
    this.testSelectControl.setValue('');
  }


  isVisibleInsuranceBeginChoice(): boolean {
    return this.form && this.form.get('situationGroup.situationChoice').value === Situation.EXISTING_CAR;
  }

  isVisibleInsuranceBeginDate(): boolean {
    return this.isVisibleInsuranceBeginChoice() &&
      this.form.get('situationGroup.insuranceBeginChoice').value === InsuranceBegin.OTHER_DATE;
  }


  private createValidator(component: Page010SituationComponent): ValidatorFn {
    return (control: AbstractControl) => {
      component.validate();
      return null;
    };
  }

  // Synchronous cross field validation.
  validate() {
    console.log('validating ...');

    if (!this.form) {
      return;
    }

    // insurance begin choice
    let control = this.form.get('situationGroup.insuranceBeginChoice');
    if (!this.isVisibleInsuranceBeginChoice()) {
      control.setErrors(null);
    } else {
      if (control.value == null) {
        control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
      }
    }

    // insuranceBeginDate
    control = this.form.get('situationGroup.insuranceBeginDate');
    if (!this.isVisibleInsuranceBeginDate()) {
      control.setErrors(null);
    } else {
      if (!control.value) {
        control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
      }
    }
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
    this.updateLanguageStrings();
  }

}

