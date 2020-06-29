import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page030VehicleUsageViewerComponent } from './page030-vehicle-usage-viewer.component';

describe('Page030VehicleUsageViewerComponent', () => {
  let component: Page030VehicleUsageViewerComponent;
  let fixture: ComponentFixture<Page030VehicleUsageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page030VehicleUsageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page030VehicleUsageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
