import { Component, OnInit, Input, AfterViewInit, Injector, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectConfig } from '../../model/select-config';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
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
