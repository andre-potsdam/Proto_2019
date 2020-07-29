import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroupComponent, FormRowComponent, InputComponent, InputDateComponent, RadioComponent, SelectComponent } from './common';
import { PageListComponent } from './modules/pages/page-list/page-list.component';
import { Page010SituationViewerComponent } from './modules/pages/page010-situation-viewer/page010-situation-viewer.component';
import { Page010SituationComponent } from './modules/pages/page010-situation/page010-situation.component';
import { Page020VehicleViewerComponent } from './modules/pages/page020-vehicle-viewer/page020-vehicle-viewer.component';
import { Page020VehicleComponent } from './modules/pages/page020-vehicle/page020-vehicle.component';
import { Page030VehicleUsageViewerComponent } from './modules/pages/page030-vehicle-usage-viewer/page030-vehicle-usage-viewer.component';
import { Page030VehicleUsageComponent } from './modules/pages/page030-vehicle-usage/page030-vehicle-usage.component';
import { HeaderComponent } from './shared';


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
    InputDateComponent,
    Page020VehicleViewerComponent,
    Page030VehicleUsageComponent,
    Page030VehicleUsageViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ApiModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
