import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleUsageData } from 'src/app/shared/api/model/vehicle-usage-data';
import { VehicleUsageKind } from 'src/app/shared/api/model/vehicle-usage-kind.enum';
import { AbstractDataEditor } from 'src/app/shared/classes/abstract-data-editor';
import { ConfigGroup } from 'src/app/shared/model/config-group';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';
import { InputConfig } from 'src/app/shared/model/input-config';
import { Language } from 'src/app/shared/model/language.enum';
import { RadioConfig } from 'src/app/shared/model/radio-config';
import { SelectConfig } from 'src/app/shared/model/select-config';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { VehicleUsageDataService } from 'src/app/shared/services/vehicle-usage-data.service';
import { Page030VehicleUsageProperties } from './page030-vehicle-usage.properties';
import { Page030VehicleUsagePropertiesDe } from './page030-vehicle-usage.properties.de';
import { Page030VehicleUsagePropertiesEn } from './page030-vehicle-usage.properties.en';
import { Page030VehicleUsagePropertiesEs } from './page030-vehicle-usage.properties.es';
import { Page030VehicleUsageStaticData } from './page030-vehicle-usage.staticData';

@Component({
  selector: 'app-page030-vehicle-usage',
  templateUrl: './page030-vehicle-usage.component.html',
  styleUrls: ['./page030-vehicle-usage.component.css']
})
export class Page030VehicleUsageComponent extends AbstractDataEditor<VehicleUsageData> implements OnInit {

  // language dependent properties
  properties: Page030VehicleUsageProperties;

  // config for labels, rendering, select items, ...
  vehicleUsageGroupConfig: FormGroupConfig;
  usageKindConfig: RadioConfig;
  milageConfig: InputConfig;
  seasonPlateChoiceConfig: RadioConfig;
  seasonPlateBeginConfig: SelectConfig;
  seasonPlateEndConfig: SelectConfig;
  homeOwnershipConfig: SelectConfig;
  parkingPlaceConfig: SelectConfig;
  configGroup: ConfigGroup;

  // reactive form controls for value and validation
  form: FormGroup;
  usageKindControl: FormControl;
  milageControl: FormControl;
  seasonPlateChoiceControl: FormControl;
  seasonPlateBeginControl: FormControl;
  seasonPlateEndControl: FormControl;
  homeOwnershipControl: FormControl;
  parkingPlaceControl: FormControl;
  financingControl: FormControl;


  constructor(
    configService: ConfigurationService,
    vehicleUsageDataService: VehicleUsageDataService) {
    super(configService, vehicleUsageDataService);
  }


  ngOnInit() {
    super.ngOnInit();

    // subscribe
    this.seasonPlateChoiceControl.valueChanges.subscribe((value) => { this.handleSeasonPlateChoiceValueChange(value); });
    // this.form.valueChanges.subscribe(() => { if (this.form.dirty) { this.vehicleDataService.setDataState(DataState.DIRTY); } });
  }


  // @override
  protected initConfigs() {

    this.vehicleUsageGroupConfig = new FormGroupConfig('vehicleUsageGroup');

    this.usageKindConfig = new RadioConfig('usageKind', true, Page030VehicleUsageStaticData.usageKindItems);
    this.milageConfig = new InputConfig('milage', 'number', false);
    this.milageConfig.postfixKey = 'milage_postfix';

    this.seasonPlateChoiceConfig = new RadioConfig('seasonPlateChoice', false, Page030VehicleUsageStaticData.seasonPlateChoiceItems);
    this.seasonPlateChoiceConfig.horizontalAlignment = true;

    this.seasonPlateBeginConfig = new SelectConfig('seasonPlateBegin', false, Page030VehicleUsageStaticData.seasonPlateMonthItems);
    this.seasonPlateEndConfig = new SelectConfig('seasonPlateEnd', false, Page030VehicleUsageStaticData.seasonPlateMonthItems);

    this.homeOwnershipConfig = new SelectConfig('homeOwnership', false, Page030VehicleUsageStaticData.homeOwnershipItems);
    this.parkingPlaceConfig = new SelectConfig('parkingPlace', false, Page030VehicleUsageStaticData.parkingPlaceItems);

    // ensure, that only one info text is shown
    this.configGroup = new ConfigGroup(
      this.usageKindConfig, this.milageConfig, this.seasonPlateChoiceConfig,
      this.seasonPlateBeginConfig, this.seasonPlateEndConfig,
      this.homeOwnershipConfig, this.parkingPlaceConfig);
  }


  // @override
  initFormControls() {

    // prepare forms model
    this.usageKindControl = new FormControl(null, Validators.required);
    this.milageControl = new FormControl(null, Validators.required);
    this.seasonPlateChoiceControl = new FormControl(null, Validators.required);
    this.seasonPlateBeginControl = new FormControl();
    this.seasonPlateEndControl = new FormControl();
    this.homeOwnershipControl = new FormControl(null, Validators.required);
    this.parkingPlaceControl = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      vehicleUsageGroup: new FormGroup({
        usageKind: this.usageKindControl,
        milage: this.milageControl,
        seasonPlateChoice: this.seasonPlateChoiceControl,
        seasonPlateBegin: this.seasonPlateBeginControl,
         seasonPlateEnd: this.seasonPlateEndControl,
        homeOwnership: this.homeOwnershipControl,
        parkingPlace: this.parkingPlaceControl,
      }, this.createValidator(this))
    });
  }


  // @override
  protected updateConfigs() { }


  // @override
  protected createDefaultData(): VehicleUsageData {
    return {
      usageKind: VehicleUsageKind.PRIVATE,
      milage: null,
      isSeasonPlate: false,
      homeOwnership: null,
      parkingPlace: null,
    };
  }


  // @override
  protected setData(data: VehicleUsageData) {

    this.usageKindControl.setValue(data.usageKind);
    this.milageControl.setValue(data.milage);
    this.seasonPlateChoiceControl.setValue(data.isSeasonPlate ? 'true' : 'false');
    if (data.isSeasonPlate) {
      this.seasonPlateBeginControl.setValue(String(data.seasonPlateBeginMonth));
      this.seasonPlateEndControl.setValue(String(data.seasonPlateEndMonth));
    }
    this.homeOwnershipControl.setValue(data.homeOwnership);
    this.parkingPlaceControl.setValue(data.parkingPlace);
  }


  // @override
  protected getData(): VehicleUsageData {

    return {
      usageKind: this.usageKindControl.value,
      milage: this.milageControl.value,
      isSeasonPlate: (this.seasonPlateChoiceControl.value === 'true' ? true : false),
      seasonPlateBeginMonth: this.seasonPlateBeginControl.value,
      seasonPlateEndMonth: this.seasonPlateEndControl.value,
      homeOwnership: this.homeOwnershipControl.value,
      parkingPlace: this.parkingPlaceControl.value,
    };
  }


  // @override
  protected updateLanguageStrings() {
    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page030VehicleUsagePropertiesEn();
        break;
      }
      case Language.ES: {
        this.properties = new Page030VehicleUsagePropertiesEs();
        break;
      }
      default: {
        this.properties = new Page030VehicleUsagePropertiesDe();
      }
    }

    this.vehicleUsageGroupConfig.updateLanguageStrings(this.properties);
    this.configGroup.updateLanguageStrings(this.properties);
  }


  // @override
  protected validate() {

    if (!this.form) {
      return;
    }

    // season plate begin/end
    this.seasonPlateBeginControl.setErrors(null);
    this.seasonPlateEndControl.setErrors(null);
    if (this.isSeasonPlate()) {
      this.validateRequired(this.seasonPlateBeginControl, 'error_msg_key');
      this.validateRequired(this.seasonPlateEndControl, 'error_msg_key');
    }
  }


  handleSeasonPlateChoiceValueChange(isSeasonPlate: boolean) {
  }

  isSeasonPlate(): boolean {
    return this.seasonPlateChoiceControl && this.seasonPlateChoiceControl.value === 'true';
  }


  onSubmit() {

    this.confirm(this.form);
  }

}

