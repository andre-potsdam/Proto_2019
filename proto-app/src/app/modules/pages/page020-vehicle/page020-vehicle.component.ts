import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { VehicleSearchResponse, VehicleSearchService } from 'src/app/api';
import { FormGroupConfig, InputConfig, PanelConfig, RadioConfig, SelectConfig, SelectItem } from 'src/app/common';
import { AbstractDataEditor, VehicleData, ConfigGroup, ConfigurationService, VehicleDataService, VehicleSelection, Language } from 'src/app/shared';
import { Page020VehicleProperties } from './page020-vehicle.properties';
import { Page020VehiclePropertiesDe } from './page020-vehicle.properties.de';
import { Page020VehiclePropertiesEn } from './page020-vehicle.properties.en';
import { Page020VehiclePropertiesEs } from './page020-vehicle.properties.es';
import { Page020VehicleStaticData } from './page020-vehicle.staticData';



@Component({
  selector: 'app-page020-vehicle',
  templateUrl: './page020-vehicle.component.html',
  styleUrls: ['./page020-vehicle.component.scss']
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
  foundVehiclePanelConfig: PanelConfig;
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

  // observable for vehicle HSN/TSN search
  readonly vehicleSearchSubject = new Subject<{ hsn: string, tsn: string, manufYear: number }>();


  constructor(
    configService: ConfigurationService,
    vehicleDataService: VehicleDataService,
    protected vehicleSearchService: VehicleSearchService) {
    super(configService, vehicleDataService);
  }


  ngOnInit() {
    super.ngOnInit();

    // subscribe
    this.manufYearControl.valueChanges.subscribe((value) => { this.handleManufYearValueChange(value); });
    this.hsnControl.valueChanges.subscribe((value) => { this.handleHsnTsnChange(); });
    this.tsnControl.valueChanges.subscribe((value) => { this.handleHsnTsnChange(); });
    this.vehicleSelectionControl.valueChanges.subscribe((value) => { this.handleSelectionControlChange(); });
    // this.form.valueChanges.subscribe(() => { if (this.form.dirty) { this.vehicleDataService.setDataState(DataState.DIRTY); } });

    this.subscribeVehicleSearch();
  }


  // @override
  protected initConfigs() {

    this.vehicleGroupConfig = new FormGroupConfig('vehicleGroup');

    this.manufYearConfig = new SelectConfig('manufYear', true, this.getYearSelectItems(1970));
    this.purchaseYearConfig = new SelectConfig('purchaseYear', false, this.getYearSelectItems(1970));

    this.vehicleSelectionConfig = new RadioConfig('vehicleSelection', false, Page020VehicleStaticData.vehicleSelectionChoiceItems);
    this.hsnConfig = new InputConfig('hsn', 'text', false);
    this.tsnConfig = new InputConfig('tsn', 'text', false);
    this.foundVehiclePanelConfig = new PanelConfig('foundVehiclePanel');

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

    // prepare forms model and field validation
    this.manufYearControl = new FormControl(null, Validators.required);
    this.purchaseYearControl = new FormControl(null, Validators.required);
    this.vehicleSelectionControl = new FormControl(null, Validators.required);
    this.hsnControl = new FormControl(null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')
      ]
    });
    this.tsnControl = new FormControl(null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern('[a-zA-Z]*')
      ]
    });
    this.manufacturerControl = new FormControl(null, Validators.required);
    this.modelChoiceControl = new FormControl(null, Validators.required);
    this.fuelControl = new FormControl(null, Validators.required);
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
    this.updateErrorMessages();
  }


  // @override
  protected validate() {
    // cross field validation

    if (!this.form) {
      return;
    }
  }


  // Update error messages.
  protected updateErrorMessages() {
    if (!this.form) {
      return;
    }

    // HSN
    if (this.hsnControl.errors) {
      const errors = this.hsnControl.errors;
      delete errors.errorKey;
      delete errors.errorMsg;
      if ('minlength' in errors || 'maxlength' in errors || 'pattern' in errors) {
        errors.errorKey = 'hsn_formatError';
        errors.errorMsg = this.properties[errors.errorKey];
      }
    }

    // TSN
    if (this.tsnControl.errors) {
      const errors = this.tsnControl.errors;
      delete errors.errorKey;
      delete errors.errorMsg;
      if ('minlength' in errors || 'maxlength' in errors || 'pattern' in errors) {
        errors.errorKey = 'tsn_formatError';
        errors.errorMsg = this.properties[errors.errorKey];
      }
    }

  }


  isVisibleHsnTsn(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.HSN_TSN;
  }


  isVisibleComfortSearch(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.COMFORT_SEARCH;
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


  handleSelectionControlChange() {
    // enable/disable optional controls, in order to get correct from group validation
    if (this.isVisibleHsnTsn()) {
      this.hsnControl.enable();
      this.tsnControl.enable();
    } else {
      this.hsnControl.disable();
      this.tsnControl.disable();
    }

    if (this.isVisibleComfortSearch()) {
      this.manufacturerControl.enable();
      this.modelChoiceControl.enable();
      this.fuelControl.enable();
    } else {
      this.manufacturerControl.disable();
      this.modelChoiceControl.disable();
      this.fuelControl.disable();
    }
  }


  handleHsnTsnChange() {
    this.info('HSN/TSN changed');

    // check conditions for vehicle search
    if (this.manufYearControl.valid && this.hsnControl.valid && this.tsnControl.valid) {
      // search vehicle by HSN/TSN
      this.info('searching vehicle for ' + this.hsnControl.value + '/' + this.tsnControl.value);
      this.vehicleSearchSubject.next({ hsn: this.hsnControl.value, tsn: this.tsnControl.value, manufYear: this.manufYearControl.value });
    }
  }


  subscribeVehicleSearch() {
    this.vehicleSearchSubject
      .pipe(
        // filter(), foir duplicate invocation
        debounceTime(500),
        tap((searchKeys) => this.info('searching vehicle: ' + JSON.stringify(searchKeys)))
      )
      .subscribe((searchKeys) => {
        this.vehicleSearchService.vehicleSearchGet(searchKeys.hsn, searchKeys.tsn, searchKeys.manufYear).subscribe({
          next: (response) => this.handleVehicleSearchResponse(response),
          error: (err) => { console.log('vehicle search error: ' + JSON.stringify(err)); this.handleVehicleSearchResponse(null); },
          complete: () => console.log('vehicle search completed')
        });
      });
  }


  handleVehicleSearchResponse(response: VehicleSearchResponse) {
    this.info('vehicle search response: ' + JSON.stringify(response));

  }


  getYearSelectItems(oldestYear: number): SelectItem[] {
    const items: SelectItem[] = [];
    for (let i = 2020; i >= oldestYear; i--) {
      items.push({ label: String(i), value: String(i) });
    }
    return items;
  }


  onSubmit() {

    // search vehicle
    if (this.isVisibleComfortSearch()) {
      this.hsnControl.setValue('0603');
      this.tsnControl.setValue('CDY');
    }

    this.updateErrorMessages();
    this.confirm(this.form);
  }


}

