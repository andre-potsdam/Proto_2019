import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { VehicleSearchResponse, VehicleSearchService } from 'src/app/api';
import { FormControlConfig, FormGroupConfig, InputConfig, RadioConfig, SelectConfig, SelectItem } from 'src/app/common';
import { AbstractDataEditor, ConfigGroup, ConfigurationService, Language, ValidationError, ValidationService, VehicleData,
  VehicleDataService, VehicleSelection } from 'src/app/shared';
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
  foundVehicleConfig: FormControlConfig;
  manufacturerConfig: SelectConfig;
  modelChoiceConfig: SelectConfig;
  fuelConfig: SelectConfig;
  financingConfig: RadioConfig;
  configGroup: ConfigGroup;

  // reactive form controls for value and validation
  form: FormGroup;
  vehicleGroup: FormGroup;
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

  // temporar data of found vehicle
  foundVehicleManufacturer: string;
  foundVehicleModel: string;
  foundVehicleImg: string;
  foundVehicleText: string;


  constructor(
    configService: ConfigurationService,
    vehicleDataService: VehicleDataService,
    protected vehicleSearchService: VehicleSearchService,
    protected validationService: ValidationService) {
    super(configService, vehicleDataService);
  }


  ngOnInit() {
    super.ngOnInit();
    this.updateFormControlVisibility();

    // subscribe
    this.manufYearControl.valueChanges.subscribe((value) => { this.handleManufYearValueChange(value); });
    this.vehicleSelectionControl.valueChanges.subscribe((value) => { this.handleSelectionControlChange(); });
    this.hsnControl.valueChanges.subscribe((value) => { this.handleHsnTsnChange(); });
    this.tsnControl.valueChanges.subscribe((value) => { this.handleHsnTsnChange(); });

    this.subscribeVehicleSearch();
  }


  // ----------- config handling ---------

  // @override
  protected initConfigs() {

    this.vehicleGroupConfig = new FormGroupConfig('vehicleGroup');

    this.manufYearConfig = new SelectConfig('manufYear', true, this.getYearSelectItems(1970));
    this.purchaseYearConfig = new SelectConfig('purchaseYear', false, this.getYearSelectItems(1970));

    this.vehicleSelectionConfig = new RadioConfig('vehicleSelection', false, Page020VehicleStaticData.vehicleSelectionChoiceItems);
    this.hsnConfig = new InputConfig('hsn', 'text', false);
    this.hsnConfig.setMaxLength(4);
    this.tsnConfig = new InputConfig('tsn', 'text', false);
    this.tsnConfig.setMaxLength(3);
    this.foundVehicleConfig = new FormControlConfig('foundVehicle', false);

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
  protected updateConfigs() { }


  // ----------- form control creation and validation ---------

  // @override
  initFormControls() {
    this.info('enter initFormControls()');

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

    this.vehicleGroup = new FormGroup({
      manufYear: this.manufYearControl,
      purchaseYear: this.purchaseYearControl,
      vehicleSelection: this.vehicleSelectionControl,
      hsn: this.hsnControl,
      tsn: this.tsnControl,
      manufacturer: this.manufacturerControl,
      model: this.modelChoiceControl,
      fuel: this.fuelControl,
      financing: this.financingControl,
    }, this.createValidator(this));

    this.form = new FormGroup({
      vehicleGroup: this.vehicleGroup
    });
  }


  // @override
  protected validate() {
    // cross field validation

    if (!this.form) {
      return;
    }
  }


  // Update error messages frontend.
  updateErrorMessages() {
    if (!this.form) {
      return;
    }

    this.updateErrorMsgForRequired(this.manufYearControl, this.properties.manufYear_requiredError);
    this.updateErrorMsgForRequired(this.purchaseYearControl, this.properties.purchaseYear_requiredError);
    this.updateErrorMsgForRequired(this.vehicleSelectionControl, this.properties.vehicleSelection_requiredError);

    this.updateErrorMsgForRequired(this.hsnControl, this.properties.hsn_requiredError);
    this.updateErrorMsgForWrongFormat(this.hsnControl, this.properties.hsn_formatError);

    this.updateErrorMsgForRequired(this.tsnControl, this.properties.tsn_requiredError);
    this.updateErrorMsgForWrongFormat(this.tsnControl, this.properties.tsn_formatError);

    this.updateErrorMsgForRequired(this.manufacturerControl, this.properties.manufacturer_requiredError);
    this.updateErrorMsgForRequired(this.modelChoiceControl, this.properties.model_requiredError);
    this.updateErrorMsgForRequired(this.fuelControl, this.properties.fuel_requiredError);
    this.updateErrorMsgForRequired(this.financingControl, this.properties.financing_requiredError);
  }


  updateErrorMessagesBackend(backendErrors: ValidationError[]) {
    if (!backendErrors) {
      return;
    }
    for (const backendError of backendErrors) {
      this.getControlForFieldPath(backendError.fieldPath).setErrors({ errorMsg: backendError.msg });
    }
  }


  getControlForFieldPath(fieldPath: string): AbstractControl {
    if (!fieldPath) {
      return this.vehicleGroup;
    }
    if (fieldPath.endsWith('hsn')) {
      return this.hsnControl;
    }
    if (fieldPath.endsWith('tsn')) {
      return this.tsnControl;
    }
    return this.vehicleGroup;
  }


  protected createBackendValidator(): AsyncValidatorFn {
    return () => this.validationService.validateVehicleData(this.getData())
      .pipe(
        map(backendErrors => this.mapErrors(backendErrors))
      );
  }

  mapErrors(backendErrors: ValidationError[]): ValidationErrors {
    if (!backendErrors) {
      return null;
    }
    return { uweError: 'irgendein Backend Fehler' };
  }


  // ---------- form control visibility ----------

  // Conditions for display of HSN/TSN panel.
  isVisibleHsnTsn(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.HSN_TSN;
  }


  // Conditions for display of comfort search panel.
  isVisibleComfortSearch(): boolean {
    return this.vehicleSelectionControl && this.vehicleSelectionControl.value === VehicleSelection.COMFORT_SEARCH;
  }


  // Update enable/disable of all form controls, which may be hidden.
  updateFormControlVisibility() {
    this.info('enter updateFormControlVisibility()');

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


  // ----------- data handling ---------

  // @override
  protected createDefaultData(): VehicleData {
    return {
      manufYear: null,
      purchaseYear: null,
      hsn: null,
      tsn: null,
      financing: null,
      manufacturer: null,
      model: null,
    };
  }


  // @override
  protected setData(data: VehicleData) {
    this.info('enter setData()');

    this.manufYearControl.setValue(data.manufYear);
    this.purchaseYearControl.setValue(data.purchaseYear);
    if (data.hsn) {
      this.vehicleSelectionControl.setValue(VehicleSelection.HSN_TSN);
    }
    this.hsnControl.setValue(data.hsn);
    this.tsnControl.setValue(data.tsn);
    this.financingControl.setValue(data.financing);

    this.manufacturerControl.setValue(data.manufacturer);
    this.modelChoiceControl.setValue(data.model);

    if (data.manufacturer) {
      this.setFoundVehicle(data.manufacturer, data.model);
    } else {
      this.clearFoundVehicle();
    }
  }


  // @override
  protected getData(): VehicleData {

    const data = {
      manufYear: this.manufYearControl.value,
      purchaseYear: this.purchaseYearControl.value,
      hsn: this.hsnControl.value,
      tsn: this.tsnControl.value,
      financing: this.financingControl.value,
      manufacturer: this.foundVehicleManufacturer,
      model: this.foundVehicleModel,
    };

    if (this.isVisibleHsnTsn()) {
      data.manufacturer = this.foundVehicleManufacturer;
      data.model = this.foundVehicleModel;
    } else {
      data.manufacturer = this.manufacturerControl.value;
      data.model = this.modelChoiceControl.value;
    }

    return data;
  }


  // ----------- business logic ---------

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


  handleSelectionControlChange() {
    this.updateFormControlVisibility();
  }


  handleHsnTsnChange() {
    this.info('HSN/TSN changed');

    this.clearFoundVehicle();

    // check conditions for vehicle search
    if (this.manufYearControl.valid && this.hsnControl.valid && this.tsnControl.valid) {
      // search vehicle by HSN/TSN
      this.info('searching vehicle for ' + this.hsnControl.value + '/' + this.tsnControl.value);
      this.vehicleSearchSubject.next({ hsn: this.hsnControl.value, tsn: this.tsnControl.value, manufYear: this.manufYearControl.value });
    }
  }


  // ---------- vehicle search ---------

  subscribeVehicleSearch() {
    this.vehicleSearchSubject
      .pipe(
        // filter(), for duplicate invocation
        debounceTime(500),
        tap((searchKeys) => this.info('searching vehicle: ' + JSON.stringify(searchKeys)))
      )
      .subscribe((searchKeys) => {
        this.vehicleSearchService.vehicleSearchGet(searchKeys.hsn, searchKeys.tsn, searchKeys.manufYear, 'response').subscribe({
          next: (response) => this.setFoundVehicleFromResponse(response),
          error: (err) => { console.log('vehicle search error: ' + JSON.stringify(err)); this.clearFoundVehicle(); },
          complete: () => console.log('vehicle search completed')
        });
      });
  }

  clearFoundVehicle() {
    this.foundVehicleManufacturer = null;
    this.foundVehicleModel = null;
    this.foundVehicleImg = null;
    this.foundVehicleText = '...';
  }

  setFoundVehicle(manufacturer: string, model: string) {
    this.foundVehicleManufacturer = manufacturer;
    this.foundVehicleModel = model;
    this.foundVehicleImg = 'assets/manufacturer/' + manufacturer.toLowerCase() + '.png';
    this.foundVehicleText = '<b>' + manufacturer + ' ' + model + '</b>';
  }

  setFoundVehicleFromResponse(response: HttpResponse<VehicleSearchResponse>) {
    if (response.status === 200) {
      const r = response.body.vehicleSearchResult;
      this.setFoundVehicle(r.manufacturer, r.model);
    } else if (response.status === 404) {
      this.setFoundVehicleError();
    }
  }

  setFoundVehicleError() {
    this.clearFoundVehicle();
    // this.foundVehicleText = this.properties.hsnTsnNotFoundError;

    this.vehicleGroup.setErrors({ hsnTsnNotFound: true });
    this.updateErrorMessage(this.vehicleGroup, ['hsnTsnNotFound'], this.properties.hsnTsnNotFoundError);
  }


  // ---------- submit ---------

  onSubmit() {

    // ensure frontend validation
    if (!this.form.valid) {
      this.updateErrorMessages();
      return;
    }

    // search vehicle
    if (this.isVisibleComfortSearch()) {
      this.hsnControl.setValue('0603');
      this.tsnControl.setValue('CDY');
    }

    this.vehicleGroup.markAsPending();
    this.validationService.validateVehicleData(this.getData())
      .subscribe({
        next: (backendErrors) => this.onBackendValidation(backendErrors),
        error: () => this.onBackendValidation(null),
      });
  }


  onBackendValidation(backendErrors: ValidationError[]) {
    this.vehicleGroup.setErrors(null);
    if (!backendErrors) {
      this.confirm(this.form);
    } else {
      this.updateErrorMessagesBackend(backendErrors);
    }
  }
}

