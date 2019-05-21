import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DonorInputComponent } from './donor-input/donor-input.component';
import { DonorComponent } from './donor/donor.component';
import {HttpClientModule }  from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AdminComponent } from './admin/admin.component';
import { ProcessDonorEnvelopeComponent } from './process-donor-envelope/process-donor-envelope.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonorInputComponent,
    DonorComponent,
    AdminComponent,
    ProcessDonorEnvelopeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
