import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputConfig } from '../../model/input-config';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})
export class InputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input('value')
  private _selectedValue: string;

  @Input()
  config: InputConfig;

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
