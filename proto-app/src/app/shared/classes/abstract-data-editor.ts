import { EventEmitter, OnInit, Output, Directive } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { DataService } from '../services/data.service';
import { ValidatorFn, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { DataState } from '../model/data-state.enum';


// Base class for data editor components.
@Directive()
export abstract class AbstractDataEditor<T> implements OnInit {

  // fire event asynchronously (!), if data are valid and submitted
  @Output() confirmed = new EventEmitter<string>(true);

  constructor(protected configService: ConfigurationService, protected dataService: DataService<T>) {
  }


  ngOnInit() {
    this.info('enter ngOnOnit()');

    this.initConfigs();
    this.updateLanguageStrings();
    this.initFormControls();
    this.initData();

    // subscribe
    this.configService.languageSubject.subscribe(language => this.updateLanguageStrings());
    // this.form.valueChanges.subscribe((value) => { if (this.form.dirty) { this.situationDataService.setDataState(DataState.DIRTY); } });
  }


  // Initialize component config instances.
  // Invoked once during component init.
  protected abstract initConfigs(): void;

  // Initialize component form controls.
  // Invoked once during component init.
  protected abstract initFormControls(): void;

  // Update language dependent strings.
  // Invoked during component init and after every language change.
  protected abstract updateLanguageStrings(): void;


  // Update form control values, from corresponding data service.
  // If data service has no data yet, the default data are created.
  // Invoked once during component init.
  protected initData(): void {

    let data = this.dataService.get();
    if (!data) {
      data = this.createDefaultData();
    }
    this.setData(data);
  }


  // Create default data.
  // Invoked once, if corresponding data service has no data yet.
  protected abstract createDefaultData(): T;

  // Update editor form controls with given data.
  // Data are either provided by data service, or default data.
  // Invoked once during component init.
  protected abstract setData(data: T): any;

  // Get data from current editor form control values.
  protected abstract getData(): T;


  // Synchronous cross field validation.
  protected abstract validate(): void;


  // This validator needs to be added to group form control, 
  // in order to trigger invocation of validate() for cross field validation.
  protected createValidator(editor: AbstractDataEditor<T>): ValidatorFn {
    return (control: AbstractControl) => {
      editor.validate();
      return null;
    };
  }


  // Set error at control, if no value.
  validateRequired(control: FormControl, errorMsgKey: string): void {
    if (control.value == null || control.value === '') {
      // TODO: language string resolution
      control.setErrors({ missingValue: errorMsgKey });
    }
  }


  protected confirm(form: FormGroup) {
    this.info('enter confirm()');

    if (!form.valid) {
      form.markAllAsTouched();
    } else {
      this.dataService.save(this.getData(), DataState.CONFIRMED);
      this.confirmed.emit('CONFIRMED');
    }
  }


  protected info(s: string): void {
    const c: any = this.constructor;
    console.log(c.name + ': ' + s);
  }
}
