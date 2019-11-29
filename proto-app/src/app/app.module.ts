import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page010SituationComponent } from './modules/pages/page010-situation/page010-situation.component';
import { InputComponent } from './shared/components/input/input.component';
import { RadioComponent } from './shared/components/radio/radio.component';
import { FormRowComponent } from './shared/components/form-row/form-row.component';
import { SelectComponent } from './shared/components/select/select.component';
import { FormGroupComponent } from './shared/components/form-group/form-group.component';
import { Page020VehicleComponent } from './modules/pages/page020-vehicle/page020-vehicle.component';
import { PageListComponent } from './modules/pages/page-list/page-list.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Page010SituationViewerComponent } from './modules/pages/page010-situation-viewer/page010-situation-viewer.component';
import { InputDateComponent } from './shared/components/input-date/input-date.component';


@NgModule({
  declarations: [
    AppComponent,
    Page010SituationComponent,
    InputComponent,
    RadioComponent,
    FormRowComponent,
    SelectComponent,
    FormGroupComponent,
    Page020VehicleComponent,
    PageListComponent,
    HeaderComponent,
    Page010SituationViewerComponent,
    InputDateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
