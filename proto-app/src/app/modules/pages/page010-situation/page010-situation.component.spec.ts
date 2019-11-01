import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page010SituationComponent } from './page010-situation.component';

describe('Page010SituationComponent', () => {
  let component: Page010SituationComponent;
  let fixture: ComponentFixture<Page010SituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page010SituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page010SituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
