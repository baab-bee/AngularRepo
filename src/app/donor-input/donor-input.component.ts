import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from './models/user.model';
import { UserRequest } from './models/user.request.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './models/address.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-donor-input',
  templateUrl: './donor-input.component.html',
  styleUrls: ['./donor-input.component.css']
})
export class DonorInputComponent implements OnInit {
 donorForm:FormGroup;
 response:any;
 baseUrl = environment.baseUrl;
 showMsg: boolean = false;
 @ViewChild('alert') alert: ElementRef;
  constructor(private formBuilder: FormBuilder, private http:HttpClient) { 
   // this.donorForm =this.createFormGroup();
  this.donorForm = this.createFormGroupWithBuilderAndModel(formBuilder);
  }

  ngOnInit() {

  }
  createFormGroup() {
    return new FormGroup({
      userRequestType: new FormControl(),
      totalOrderedQty: new FormControl(),
      remarks: new FormControl(),
      user: new FormGroup({
        name: new FormControl(),
        emailId: new FormControl(),
        mobile: new FormControl(),
        address: new FormGroup({
          addressLine1: new FormControl(),
          addressLine2: new FormControl(),
          city: new FormControl(),
          state: new FormControl(),
          zipcode: new FormControl(),
          country: new FormControl(),
        })
      })
    });
  }
  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      userRequestType:'D',
      totalOrderedQty:'',
      remarks:'',
      user: formBuilder.group({
        name: '',
        emailId: '',
        mobile: '',
        address: formBuilder.group(new Address())})
    });
  }

/*
  onClickSubmit(data) {
    this.donor.totalOrderedQty = data.frameCount;
    this.donor.userRequestType = "D";
    this.user.name = data.name;
    this.user.emailId = data.email;
    this.user.mobile = data.mobile;
    this.address.addressLine1 = data.addressLine1;
    this.user.address = this.address;
    this.donor.user = this.user;
    console.log("Helloozczc" + JSON.stringify(this.donor));
  }
*/

closeAlert() {
  this.alert.nativeElement.classList.remove('show');
}
  onSubmit(){
    const result: UserRequest = Object.assign({}, this.donorForm.value);
    result.user= Object.assign({}, result.user);
    result.user.address = Object.assign({}, result.user.address);

    console.log("Form Model is"+JSON.stringify(result));
   let url = this.baseUrl+ 'donorRequests';
   let observer = this.http.post(url,result,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
   observer.subscribe((response) => { this.response = response;
    console.log("recieved" +JSON.stringify(this.response));
    this.showMsg = true;
            });


  }
}
