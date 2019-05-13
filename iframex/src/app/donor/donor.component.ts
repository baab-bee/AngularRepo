import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})

export class DonorComponent {
  donorComp:FormGroup;
  radioSelectedValue:string;
  constructor(formBuilder: FormBuilder, httpClient:HttpClient) { 
   this.donorComp = formBuilder.group({
     donorCompOpts: ["", Validators.required]
   });
   }
  
  //on submit function
  onClickSubmit(data: { donorCompOpts: string; }){
    this.radioSelectedValue = data.donorCompOpts;
  }
}