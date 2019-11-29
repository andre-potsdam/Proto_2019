import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page020VehicleComponent } from './page020-vehicle.component';

describe('Page020VehicleComponent', () => {
  let component: Page020VehicleComponent;
  let fixture: ComponentFixture<Page020VehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page020VehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page020VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
