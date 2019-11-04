import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page010SituationComponent } from './modules/pages/page010-situation/page010-situation.component';
import { InputComponent } from './shared/components/input/input.component';
import { RadioComponent } from './shared/components/radio/radio.component';
import { FormRowComponent } from './shared/components/form-row/form-row.component';
import { SelectComponent } from './shared/components/select/select.component';


@NgModule({
  declarations: [
    AppComponent,
    Page010SituationComponent,
    InputComponent,
    RadioComponent,
    FormRowComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
