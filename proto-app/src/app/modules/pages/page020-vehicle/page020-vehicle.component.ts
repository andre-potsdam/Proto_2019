import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractDataEditor } from 'src/app/shared/classes/abstract-data-editor';
import { ConfigGroup } from 'src/app/shared/model/config-group';
import { FormGroupConfig } from 'src/app/shared/model/form-group-config';
import { InputConfig } from 'src/app/shared/model/input-config';
import { Language } from 'src/app/shared/model/language.enum';
import { RadioConfig } from 'src/app/shared/model/radio-config';
import { SelectConfig } from 'src/app/shared/model/select-config';
import { SelectItem } from 'src/app/shared/model/select-item';
import { VehicleSelection } from 'src/app/shared/model/vehicle-selection.enum';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { VehicleDataService } from 'src/app/shared/services/vehicle-data.service';
import { VehicleData } from './../../../shared/api/model/vehicle-data';
import { Page020VehicleProperties } from './page020-vehicle.properties';
import { Page020VehiclePropertiesDe } from './page020-vehicle.properties.de';
import { Page020VehiclePropertiesEn } from './page020-vehicle.properties.en';
import { Page020VehiclePropertiesEs } from './page020-vehicle.properties.es';
import { Page020VehicleStaticData } from './page020-vehicle.staticData';



@Component({
  selector: 'app-page020-vehicle',
  templateUrl: './page020-vehicle.component.html',
  styleUrls: ['./page020-vehicle.component.css']
})
export class Page020VehicleComponent extends AbstractDataEditor<VehicleData> implements OnInit {

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

    this.vehicleSelectionConfig = new RadioConfig('vehicleSelection', false, Page020VehicleStaticData.vehicleSelectionChoiceItems);
    this.hsnConfig = new InputConfig('hsn', 'text', false);
    this.tsnConfig = new InputConfig('tsn', 'text', false);

    this.manufacturerConfig = new SelectConfig('manufacturer', false, Page020VehicleStaticData.manufacturerItems);
    this.modelChoiceConfig = new SelectConfig('model', false, Page020VehicleStaticData.modelItems);
    this.fuelConfig = new RadioConfig('fuel', false, Page020VehicleStaticData.fuelItems);

    this.financingConfig = new RadioConfig('financing', false, Page020VehicleStaticData.financingItems);
    this.financingConfig.horizontalAlignment = true;

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
      }, this.createValidator(this))
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
    if (data.hsn) {
      this.vehicleSelectionControl.setValue(VehicleSelection.HSN_TSN);
    }
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
      case Language.ES: {
        this.properties = new Page020VehiclePropertiesEs();
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

    if (!this.form) {
      return;
    }

    // HSN/TSN
    this.hsnControl.setErrors(null);
    this.tsnControl.setErrors(null);
    if (this.isVisibleHsnTsn()) {
      this.validateRequired(this.hsnControl, 'error_msg_key');
      this.validateRequired(this.tsnControl, 'error_msg_key');
    }

    // manufacturer/model/fuel
    this.manufacturerControl.setErrors(null);
    this.modelChoiceControl.setErrors(null);
    this.fuelControl.setErrors(null);
    if (this.isVisibleComfortSearch()) {
      this.validateRequired(this.manufacturerControl, 'error_msg_key');
      this.validateRequired(this.modelChoiceControl, 'error_msg_key');
      this.validateRequired(this.fuelControl, 'error_msg_key');
    }
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


  isVisibleComfortSearch(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.COMFORT_SEARCH;
  }


  onSubmit() {

    // search vehicle
    if (this.isVisibleComfortSearch()) {
      this.hsnControl.setValue('0603');
      this.tsnControl.setValue('CDY');
    }

    this.confirm(this.form);
  }

}

