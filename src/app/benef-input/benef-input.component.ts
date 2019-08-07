import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-benef-input',
  templateUrl: './benef-input.component.html',
  styleUrls: ['./benef-input.component.css']
})
export class BenefInputComponent implements OnInit {
  addForm: FormGroup;
  userForm: FormGroup;
  addressForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  baseUrl = environment.baseUrl;
  response:any;
 showMsg: boolean = false;
 @ViewChild('alert') alert: ElementRef;
  constructor(private fb: FormBuilder, private http:HttpClient) {

    this.addForm = this.fb.group({
      userRequestType:['B']
    });
  this.userForm = this.fb.group({
    name:[''],
    emailId:[''],
    mobile:['']
  });

  this.addressForm = this.fb.group({
    addressLine1: [''],
    city: [''],
    state:[''],
    zipcode: [''],
    country:['']
  });

    this.rows = this.fb.array([]);

  }

  ngOnInit() {


        this.addForm.addControl('frameRequests', this.rows);
   this.addForm.addControl('user',this.userForm);
   this.userForm.addControl('address', this.addressForm);
      }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
    
  }
  scrollWin(){
    window.scrollBy(0,10);
  }
   
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    this.scrollWin();
    return this.fb.group({
      gender: null,
      size: null,
      color: null,
      material:null
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
    onSubmit(){
      // const result: UserRequest = Object.assign({}, this.donorForm.value);
      // result.user= Object.assign({}, result.user);
      // result.user.address = Object.assign({}, result.user.address);
  
      console.log("Form Model is"+JSON.stringify(this.addForm.value));
     let url = this.baseUrl+ 'beneficiaryRequests';
     let observer = this.http.post(url,this.addForm.value,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
     observer.subscribe((response) => { this.response = response;
      console.log("recieved" +JSON.stringify(this.response));
      this.showMsg = true;
              });
  
  
    }
}
