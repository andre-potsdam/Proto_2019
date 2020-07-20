import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';
import { FormGroupConfig } from '../model/form-group-config';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.config = new FormGroupConfig('MyFormGroup');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
