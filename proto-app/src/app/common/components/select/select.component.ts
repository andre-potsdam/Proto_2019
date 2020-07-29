import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectConfig } from '../../model/select-config';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input('value')
  private _selectedValue: string;

  @Input()
  config: SelectConfig;

  control: FormControl;

  // use this value for option 'bitte wählen'
  readonly VALUE_FOR_CHOOSE = null;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }
  }

  // get value or null
  get selectedValue() {
    return this._selectedValue;
  }

  // set value, or null resp. '' for 'please select' option
  set selectedValue(val) {
    this.writeValue(val);
    this.onChange(this._selectedValue);
    this.onTouched();
  }

  writeValue(val: any): void {
    if (val === null || val === '') {
      val = this.VALUE_FOR_CHOOSE;
    }
    this._selectedValue = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // TODO
  }
}
