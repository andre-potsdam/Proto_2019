import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlConfig } from '../../model/form-control-config';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRowComponent),
      multi: true
    }
  ],
})
export class FormRowComponent implements OnInit, AfterViewInit {

  @Input()
  config: FormControlConfig;

  control: FormControl;

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

  toggleInfo(event: Event) {
    event.stopPropagation();
    if (this.config.infoText) {
      this.config.showInfo = !this.config.showInfo;
    }
  }

  showInfo() {
    if (this.config.infoText && !this.config.showInfo) {
      this.config.showInfo = true;
    }
  }
}
