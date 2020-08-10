import { Component, Input, OnInit, Injector, AfterViewInit } from '@angular/core';
import { FormGroupConfig } from '../../model/form-group-config';
import { FormGroup, NgControl, FormControl, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit, AfterViewInit {

  @Input()
  config: FormGroupConfig;

  control: FormGroup;

  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    const ngControl: FormGroupName = this.injector.get(FormGroupName, null);
    if (ngControl) {
      this.control = ngControl.control as FormGroup;
    }
  }


  getErrorMsg(): string {
    if (this.control && this.control.errors && this.control.errors.errorMsg) {
      return this.control.errors.errorMsg;
    }
    return null;
  }

  hasErrorMsg(): boolean {
    if (this.getErrorMsg()) {
      return true;
    }
    return false;
  }

}
