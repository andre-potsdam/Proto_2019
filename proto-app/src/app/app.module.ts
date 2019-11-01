import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page010SituationComponent } from './modules/pages/page010-situation/page010-situation.component';
import { FormGroupComponent } from './shared/components/form-group/form-group.component';
import { InputComponent } from './shared/components/input/input.component';
import { RadioComponent } from './shared/components/radio/radio.component';


@NgModule({
  declarations: [
    AppComponent,
    Page010SituationComponent,
    FormGroupComponent,
    InputComponent,
    RadioComponent
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
