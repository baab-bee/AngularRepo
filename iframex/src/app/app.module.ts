import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DonorInputComponent } from './donor-input/donor-input.component';
import { DonorComponent } from './donor/donor.component';
import {HttpClientModule }  from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AdminComponent } from './admin/admin.component';
import { ProcessDonorEnvelopeComponent } from './process-donor-envelope/process-donor-envelope.component';
import { BenefInputComponent } from './benef-input/benef-input.component';
import { ReceiveAndValidateComponent } from './recieve-validate-frame/ReceiveAndValidate.component';
import { ProcessFrameRequestComponent } from './process-frame-request/process-frame-request.component';
import { MatchFrameComponent } from './match-frame/match-frame.component';
import { MatchFrameServiceComponent } from './match-frame-service/match-frame-service.component';
import { ProcessDonationComponent } from './process-donation/process-donation.component';
import { AlertComponent } from './alert/alert.component';
import { DropoffComponent } from './dropoff/Dropoff.component';
import { SelfPaidEnvelopeComponent } from './selfPaidEnvelope/SelfPaidEnvelope.component';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonorInputComponent,
    DonorComponent,
    AdminComponent,
    ProcessDonorEnvelopeComponent,
    BenefInputComponent,
    ReceiveAndValidateComponent,
    ProcessFrameRequestComponent,
    MatchFrameComponent,
    MatchFrameServiceComponent,
    ProcessDonationComponent,
    AlertComponent,
    MatchFrameServiceComponent,
    DropoffComponent,
    SelfPaidEnvelopeComponent,
    ModalComponent
  ],
  entryComponents: [MatchFrameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    })
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
