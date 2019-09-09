import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsModule, AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})

export class DonorComponent {
  donorComp: FormGroup;
  radioSelectedValue: string;
  router: Router;
  constructor(formBuilder: FormBuilder, router: Router) {
    this.donorComp = formBuilder.group({
      donorCompOpts: ["", Validators.required]
    });
    this.router = router;
  }

  //on submit function
  onClickSubmit(data: { donorCompOpts: string; }) {
    this.radioSelectedValue = data.donorCompOpts;

    if (this.radioSelectedValue == 'prepaid_envelope') {
      //alert(this.radioSelectedValue)
      this.router.navigate(['../donor']);
    }
    else if (this.radioSelectedValue == 'dropoff_location') {
       this.router.navigate(['../dropoff']);
} else {
    this.router.navigate(['../selfPaidEnvelope']);
    }
    //navigate to the donor-input screen
  }
}