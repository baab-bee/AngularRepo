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
import { ReceiveAndValidateComponent } from './ReceiveAndValidate/ReceiveAndValidate.component';
import { processDonationRequest } from './processDonationRequest/processDonationRequest.component';
import { ProcessFrameRequestComponent } from './process-frame-request/process-frame-request.component';
import { MatchFrameComponent } from './match-frame/match-frame.component';
import { MatchFrameServiceComponent } from './match-frame-service/match-frame-service.component';


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
    processDonationRequest,
    ProcessFrameRequestComponent,
    MatchFrameComponent,
    MatchFrameServiceComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }