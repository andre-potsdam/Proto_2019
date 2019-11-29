import { VehicleData } from './../../../shared/api/model/vehicle-data';
import { Component, OnInit } from '@angular/core';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';
import { SelectConfig } from 'src/app/shared/model/select-config';
import { InputConfig } from 'src/app/shared/model/input-config';
import { ConfigGroup } from 'src/app/shared/util/config-group';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SituationDataService } from 'src/app/shared/services/situation-data.service';
import { RadioConfig } from 'src/app/shared/model/radio-config';
import { Situation } from 'src/app/shared/api/model/situation.enum';
import { Language } from 'src/app/shared/model/language.enum';
import { Page010SituationPropertiesEn } from '../page010-situation/page010-situation.properties.en';
import { Page010SituationPropertiesDe } from '../page010-situation/page010-situation.properties.de';
import { Page010SituationComponent } from '../page010-situation/page010-situation.component';
import { Page020VehicleProperties } from './page020-vehicle.properties';
import { Page020VehiclePropertiesDe } from './page020-vehicle.properties.de';
import { Page020VehiclePropertiesEn } from './page020-vehicle.properties.en';
import { SelectItem } from 'src/app/shared/model/select-item';
import { VehicleDataService } from 'src/app/shared/services/vehicle-data.service';
import { DataState } from 'src/app/shared/model/data-state.enum';
import { AbstractDataEditor } from 'src/app/shared/classes/abstract-data-editor';



enum VehicleSelection {
  HSN_TSN = 'HSN_TSN',
  COMFORT_SEARCH = 'COMFORT_SEARCH',
}

@Component({
  selector: 'app-page020-vehicle',
  templateUrl: './page020-vehicle.component.html',
  styleUrls: ['./page020-vehicle.component.css']
})
export class Page020VehicleComponent extends AbstractDataEditor<VehicleData> {

  // language dependent properties
  properties: Page020VehicleProperties;

  // config for labels, rendering, select items, ...
  vehicleGroupConfig: FormGroupConfig;
  manufYearConfig: SelectConfig;
  purchaseYearConfig: SelectConfig;
  vehicleSelectionConfig: RadioConfig;
  hsnConfig: InputConfig;
  tsnConfig: InputConfig;
  manufacturerConfig: SelectConfig;
  modelChoiceConfig: SelectConfig;
  fuelConfig: SelectConfig;
  financingConfig: RadioConfig;
  configGroup: ConfigGroup;

  // reactive form controls for value and validation
  form: FormGroup;
  manufYearControl: FormControl;
  purchaseYearControl: FormControl;
  vehicleSelectionControl: FormControl;
  hsnControl: FormControl;
  tsnControl: FormControl;
  manufacturerControl: FormControl;
  modelChoiceControl: FormControl;
  fuelControl: FormControl;
  financingControl: FormControl;


  constructor(
    configService: ConfigurationService,
    vehicleDataService: VehicleDataService) {
    super(configService, vehicleDataService);
  }


  ngOnInit() {
    super.ngOnInit();

    // subscribe
    this.manufYearControl.valueChanges.subscribe((value) => { this.handleManufYearValueChange(value); });
    // this.form.valueChanges.subscribe(() => { if (this.form.dirty) { this.vehicleDataService.setDataState(DataState.DIRTY); } });
  }


  // @override
  protected initConfigs() {

    this.vehicleGroupConfig = new FormGroupConfig('vehicleGroup');

    this.manufYearConfig = new SelectConfig('manufYear', true, this.getYearSelectItems(1970));

    this.purchaseYearConfig = new SelectConfig('purchaseYear', false, this.getYearSelectItems(1970));

    this.vehicleSelectionConfig = new RadioConfig(
      'vehicleSelection',
      false,
      [{ value: VehicleSelection.HSN_TSN, labelKey: 'vehicleSelection_hsntsn_label' },
      { value: VehicleSelection.COMFORT_SEARCH, labelKey: 'vehicleSelection_comfortSearch_label' },
      ]);

    this.hsnConfig = new InputConfig('hsn', 'text', false);
    this.tsnConfig = new InputConfig('tsn', 'text', false);

    this.manufacturerConfig = new SelectConfig(
      'manufacturer', false,
      [{ value: 'Audi', label: 'Audi' },
      { value: 'BMW', label: 'BMW' },
      { value: 'Ford', label: 'Ford' },
      { value: 'VW', label: 'VW' },
      ]
    );

    this.modelChoiceConfig = new SelectConfig(
      'model', false,
      [{ value: 'Golf', label: 'Golf' },
      { value: 'Passat', label: 'Passat' },
      { value: 'Polo', label: 'Polo' },
      { value: 'Tiguan', label: 'Tiguan' },
      ]
    );

    this.fuelConfig = new RadioConfig(
      'fuel', false,
      [{ value: 'Benzin', labelKey: 'fuel_benzin_label' },
      { value: 'Diesel', labelKey: 'fuel_diesel_label' },
      ]);

    this.financingConfig = new RadioConfig(
      'financing',
      false,
      [{ value: 'false', labelKey: 'financing_no_label' },
      { value: 'true', labelKey: 'financing_yes_label' },
      ]);

    // ensure, that only one info text is shown
    this.configGroup = new ConfigGroup(
      this.manufYearConfig, this.purchaseYearConfig, this.vehicleSelectionConfig,
      this.hsnConfig, this.tsnConfig,
      this.manufacturerConfig, this.modelChoiceConfig, this.fuelConfig, this.financingConfig);
  }


  // @override
  initFormControls() {

    // prepare forms model
    this.manufYearControl = new FormControl(null, Validators.required);
    this.purchaseYearControl = new FormControl(null, Validators.required);
    this.vehicleSelectionControl = new FormControl(null, Validators.required);
    this.hsnControl = new FormControl();
    this.tsnControl = new FormControl();
    this.manufacturerControl = new FormControl();
    this.modelChoiceControl = new FormControl();
    this.fuelControl = new FormControl();
    this.financingControl = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      vehicleGroup: new FormGroup({
        manufYear: this.manufYearControl,
        purchaseYear: this.purchaseYearControl,
        vehicleSelection: this.vehicleSelectionControl,
        hsn: this.hsnControl,
        tsn: this.tsnControl,
        manufacturer: this.manufacturerControl,
        model: this.modelChoiceControl,
        fuel: this.fuelControl,
        financing: this.financingControl,
      })
    });
  }


  // @override
  protected updateConfigs() { }


  // @override
  protected createDefaultData(): VehicleData {
    return {
      manufYear: null,
      purchaseYear: null,
      hsn: null,
      tsn: null,
      financing: null,
    };
  }


  // @override
  protected setData(data: VehicleData) {

    this.manufYearControl.setValue(data.manufYear);
    this.purchaseYearControl.setValue(data.purchaseYear);
    this.vehicleSelectionControl.setValue(VehicleSelection.HSN_TSN);
    this.hsnControl.setValue(data.hsn);
    this.tsnControl.setValue(data.tsn);
    this.financingControl.setValue(data.financing);
  }


  // @override
  protected getData(): VehicleData {

    return {
      manufYear: this.manufYearControl.value,
      purchaseYear: this.purchaseYearControl.value,
      hsn: this.hsnControl.value,
      tsn: this.tsnControl.value,
      financing: this.financingControl.value,
    };
  }


  // @override
  protected updateLanguageStrings() {
    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page020VehiclePropertiesEn();
        break;
      }
      default: {
        this.properties = new Page020VehiclePropertiesDe();
      }
    }

    this.vehicleGroupConfig.updateLanguageStrings(this.properties);
    this.configGroup.updateLanguageStrings(this.properties);
  }


  // @override
  protected validate() {
    console.log('validating ...');

    if (!this.form) {
      return;
    }

    // // insurance begin choice
    // let control = this.form.get('situationGroup.insuranceBeginChoice');
    // if (!this.isVisibleInsuranceBeginChoice()) {
    //   control.setErrors(null);
    // } else {
    //   if (control.value == null) {
    //     control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
    //   }
    // }

    // // insuranceBeginDate
    // control = this.form.get('situationGroup.insuranceBeginDate');
    // if (!this.isVisibleInsuranceBeginDate()) {
    //   control.setErrors(null);
    // } else {
    //   if (!control.value) {
    //     control.setErrors({ missingValue: 'Bitte treffen Sie eine Auswahl' });
    //   }
    // }
  }


  handleManufYearValueChange(manufYear: number) {
    console.log('manuf year changed: ' + manufYear);

    // correct purchase year select items
    this.purchaseYearConfig.items = this.getYearSelectItems(manufYear);
    // correct purchase year value
    if (this.purchaseYearControl.value && this.purchaseYearControl.value < manufYear) {
      this.purchaseYearControl.setValue(null);
    }
  }

  getYearSelectItems(oldestYear: number): SelectItem[] {
    const items: SelectItem[] = [];
    for (let i = 2020; i >= oldestYear; i--) {
      items.push({ label: String(i), value: String(i) });
    }
    return items;
  }


  isVisibleHsnTsn(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.HSN_TSN;
  }


  onSubmit() {
    this.confirm(this.form);
  }

}

