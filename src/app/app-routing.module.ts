import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DonorInputComponent } from './donor-input/donor-input.component';
import { AdminComponent } from './admin/admin.component';
import { DonorComponent } from './donor/donor.component';
import { ProcessDonorEnvelopeComponent } from './process-donor-envelope/process-donor-envelope.component';
import { BenefInputComponent } from './benef-input/benef-input.component';
import { ReceiveAndValidateComponent } from './ReceiveAndValidate/ReceiveAndValidate.component';
import { processDonationRequest } from './processDonationRequest/processDonationRequest.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'donor', component:DonorInputComponent},
  {path:'admin', component:AdminComponent},
  {path:'donor-opts', component:DonorComponent},
  {path:'sendEnvelope', component:ProcessDonorEnvelopeComponent},
  {path:'beneficiary', component:BenefInputComponent},
  {path:'receiveAndValidate', component:ReceiveAndValidateComponent},
  {path:'processDonationRequest', component:processDonationRequest}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
