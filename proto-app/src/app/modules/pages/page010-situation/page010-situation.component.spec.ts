import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormGroupComponent, FormRowComponent, InputDateComponent, RadioComponent } from 'src/app/common';
import { Page010SituationComponent } from './page010-situation.component';


describe('Page010SituationComponent', () => {
  let component: Page010SituationComponent;
  let fixture: ComponentFixture<Page010SituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormGroupComponent,
        FormRowComponent,
        RadioComponent,
        InputDateComponent,
        Page010SituationComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
      ]
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

  it('should bind situation', () => {
    const htmlElem: HTMLElement = fixture.nativeElement.querySelector('#situationChoice_0');
  });
});
