import { Component, OnInit, Input } from '@angular/core';
import { FormGroupConfig } from '../../model/form-group-config';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input()
  config: FormGroupConfig;

  constructor() { }

  ngOnInit() {
  }

}
