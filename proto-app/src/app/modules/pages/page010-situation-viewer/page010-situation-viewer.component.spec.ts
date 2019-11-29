import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page010SituationViewerComponent } from './page010-situation-viewer.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
