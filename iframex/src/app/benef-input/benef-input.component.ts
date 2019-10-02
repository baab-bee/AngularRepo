import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { BenRequestService } from './benef-request-service';
import { BenRequest } from './models/ben.request.model';
import { AlertService } from '../alert/alert.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-benef-input',
  templateUrl: './benef-input.component.html',
  styleUrls: ['./benef-input.component.css'],
  providers: [BenRequestService]
})
export class BenefInputComponent implements OnInit {
  addForm: FormGroup;
  userForm: FormGroup;
  addressForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  baseUrl = environment.baseUrl;
  response: any;
  submitted = false;
  modalText: string;
  // showMsg: boolean = false;
  showFrame: boolean = false;
  // @ViewChild('alert') alert: ElementRef;
  constructor(private fb: FormBuilder, private logger: NGXLogger, private alertService: AlertService, private benReqService: BenRequestService, private modalService: ModalService) {
    // this.addForm = this.fb.group({
    //   remarks: new FormControl( ''),
    //   status: new FormControl('BEN_REQ_INITIATED')
    // });
    // this.userForm = this.fb.group({
    //   name: ['', Validators.required],
    //   emailId: ['', [Validators.required, Validators.email]],
    //   mobile: ['', Validators.required]
    // });

    // this.addressForm = this.fb.group({
    //   addressLine1: ['', Validators.required],
    //   city: ['', Validators.required],
    //   state: ['', Validators.required],
    //   zipcode: ['', Validators.required],
    //   country: ['', Validators.required]
    // });
    // this.rows = this.fb.array([]);
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    this.addForm = this.fb.group({
      remarks: new FormControl(''),
      status: new FormControl('BEN_REQ_INITIATED')
    })
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });

    this.addressForm = this.fb.group({
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.rows = this.fb.array([]);
    this.addForm.addControl('frameRequests', this.rows);
    this.addForm.addControl('user', this.userForm);
    this.userForm.addControl('address', this.addressForm);
    return this.addForm;
  }
  ngOnInit() {
    // this.addForm.addControl('frameRequests', this.rows);
    // this.addForm.addControl('user', this.userForm);
    // this.userForm.addControl('address', this.addressForm);
    this.addForm = this.createFormGroupWithBuilderAndModel(this.fb);
  }
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
    this.logger.debug("Row length" + this.rows.length);
    if (this.rows.length == 5) {
      this.logger.debug("Form Array Row length is" + this.rows.length);
      this.showFrame = true;
    }

  }
  scrollWin() {
    window.scrollBy(0, 10);
  }

  onRemoveRow(rowIndex: number) {
    if (this.showFrame)
      this.showFrame = false;
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    this.scrollWin();
    return this.fb.group({
      gender: [''],
      size: [''],
      color: [''],
      material: [''],
      status: ['FRAME_REQ_INITAITED']
    });
  }

  get f() { return this.userForm.get('name'); }
  get g() { return this.userForm.get('emailId'); }
  get j() { return this.userForm.get('mobile'); }
  get h() { return this.addressForm.get('addressLine1'); }
  get k() { return this.addressForm.get('city'); }
  get l() { return this.addressForm.get('state'); }
  get m() { return this.addressForm.get('zipcode'); }
  get n() { return this.addressForm.get('country'); }
  // closeAlert() {
  //   this.alert.nativeElement.classList.remove('show');
  // }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    const result: BenRequest = Object.assign({}, this.addForm.value);
    this.logger.debug("Beneficiary Form is::" + JSON.stringify(result));
    let observer = this.benReqService.createBenRequest(result);
    observer.subscribe((data: BenRequest) => {
      this.submitted = false;
      this.showFrame = false;
      this.logger.debug("recieved" + JSON.stringify(data));
      // this.alertService.success('Success! Data Submitted Successfully!', true);
      this.addForm = this.createFormGroupWithBuilderAndModel(this.fb);
      this.modalText = "Thank you for approaching us. We will get back you Soon.";
      this.openModal();
    }, error => {
      // this.alertService.error(error);
      this.modalText = error;
      this.openModal();
    });


  }
  openModal() {

    this.modalService.open('custom-modal-1');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
