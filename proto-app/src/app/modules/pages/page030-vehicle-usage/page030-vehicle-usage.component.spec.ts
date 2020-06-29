import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page030VehicleUsageComponent } from './page030-vehicle-usage.component';

describe('Page030VehicleUsageComponent', () => {
  let component: Page030VehicleUsageComponent;
  let fixture: ComponentFixture<Page030VehicleUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page030VehicleUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page030VehicleUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
