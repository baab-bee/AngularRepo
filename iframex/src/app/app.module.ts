import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DonorInputComponent } from './donor-input/donor-input.component';
import { DonorComponent } from './donor/donor.component';
import {HttpClientModule }  from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonorInputComponent,
    DonorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
