import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioConfig } from '../../model/radio-config';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
})
export class RadioComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input('value')
  private _selectedValue: string;

  @Input()
  config: RadioConfig;

  control: FormControl;

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


  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(val) {
    this._selectedValue = val;
    this.onChange(this._selectedValue);
    this.onTouched();
  }

  writeValue(val: any): void {
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
