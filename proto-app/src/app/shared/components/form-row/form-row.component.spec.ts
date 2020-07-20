import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowComponent } from './form-row.component';
import { FormControlConfig } from '../../model/form-control-config';

describe('FormRowComponent', () => {
  let component: FormRowComponent;
  let fixture: ComponentFixture<FormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowComponent);
    component = fixture.componentInstance;
    component.config = new FormControlConfig('MyFormRow', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
