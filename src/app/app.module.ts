import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AutoAccidentComponent } from './InjuryForms/auto-accident/auto-accident.component';
import { MotorCycleAccidentComponent } from './InjuryForms/motor-cycle-accident/motor-cycle-accident.component';
import { TruckAccidentComponent } from './InjuryForms/truck-accident/truck-accident.component';
import { FormDataService } from './services/form-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    HeaderComponent,
    FooterComponent,
    AutoAccidentComponent,
    MotorCycleAccidentComponent,
    TruckAccidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FormDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
