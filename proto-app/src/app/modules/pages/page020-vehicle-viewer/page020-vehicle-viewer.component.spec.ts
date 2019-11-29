import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page020VehicleViewerComponent } from './page020-vehicle-viewer.component';

describe('Page020VehicleViewerComponent', () => {
  let component: Page020VehicleViewerComponent;
  let fixture: ComponentFixture<Page020VehicleViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page020VehicleViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page020VehicleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
