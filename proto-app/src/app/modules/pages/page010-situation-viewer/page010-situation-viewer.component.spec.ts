import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page010SituationViewerComponent } from './page010-situation-viewer.component';
import { DataItem } from 'src/app/shared/model/data-item';

describe('Page010SituationViewerComponent', () => {
  let component: Page010SituationViewerComponent;
  let fixture: ComponentFixture<Page010SituationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page010SituationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page010SituationViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.situationItem = new DataItem('MySituationKey', 'MySituationValue');
    component.insuranceBeginItem = new DataItem('MyInsuranceBeginKey', 'MyInsuranceBeginValue');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
