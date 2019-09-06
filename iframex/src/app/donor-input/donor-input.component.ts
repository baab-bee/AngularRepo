import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from './models/user.model';
import { DonorRequest } from './models/donor.request.model';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './models/address.model';
import { environment } from '../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { DonRequestService } from './donor-request-service';
import { AlertService } from '../alert/alert.service';


@Component({
  selector: 'app-donor-input',
  templateUrl: './donor-input.component.html',
  styleUrls: ['./donor-input.component.css'],
  providers:[DonRequestService]
})
export class DonorInputComponent implements OnInit {
  donorForm: FormGroup;
  response: any;
  baseUrl = environment.baseUrl;
  //showMsg: boolean = false;
  submitted = false;
 // @ViewChild('alert') alert: ElementRef;
  constructor(private formBuilder: FormBuilder, private donService: DonRequestService, private logger: NGXLogger, private alertService: AlertService) {
    //Creating the form group with model
  
  }

  ngOnInit() {
    this.donorForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);
  }
  // This method instantiate the donor form
  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      envelopeSize: [''] ,
      status: 'DON_REQ_INITIATED',
      user: formBuilder.group({
        name: ['', Validators.required] ,
        emailId: ['',Validators.email],
        mobile: ['',Validators.maxLength(10)],
        address: formBuilder.group({
          addressLine1:['', Validators.required ] ,
          addressLine2:['' ] ,
          city:['', Validators.required ] ,
          state:['', Validators.required ] ,
          zipcode:['', Validators.required] ,
          country:['', Validators.required ]
        })
      })
    });
  }

  get f() {return this.donorForm.get('user.name');}
  get g() {return this.donorForm.get('user.emailId');}
  get j() {return this.donorForm.get('user.mobile');}
  get h() {return this.donorForm.get('user.address.addressLine1');}
  get k() {return this.donorForm.get('user.address.city');}
  get l() {return this.donorForm.get('user.address.state');}
  get m() {return this.donorForm.get('user.address.zipcode');}
  get n() {return this.donorForm.get('user.address.country');}

  // closeAlert() {
  //   this.alert.nativeElement.classList.remove('show');
  // }
  onSubmit() {
    this.submitted =true;
     // reset alerts on submit
     this.alertService.clear();
    if (this.donorForm.invalid) {
      return;
  }

    const result: DonorRequest = Object.assign({}, this.donorForm.value);
    result.user = Object.assign({}, result.user);
    result.user.address = Object.assign({}, result.user.address);
    this.logger.debug("Donor Form is::" + JSON.stringify(result));
    // let url = this.baseUrl+ 'donorRequests';
    // this.logger.debug("Donor Form Post URL is::"+url);
    let observer = this.donService.createDonRequest(result);
    // let observer = this.http.post(url,result,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
    observer.subscribe(
      response => {
      this.response = response;
      this.logger.debug("recieved" + JSON.stringify(this.response));
      //error handling 
     // this.showMsg = true;
     this.alertService.success('Success! Data Submitted Successfully!', true);
    },  error => {
      this.alertService.error(error);
  });
  }
}
