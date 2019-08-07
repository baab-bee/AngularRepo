import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Frame} from './frame.model';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-ReceiveAndValidate',
  templateUrl: './ReceiveAndValidate.component.html',
  styleUrls: ['./ReceiveAndValidate.component.css']
})

export class ReceiveAndValidateComponent implements OnInit {

  rows: FormArray;
  addForm: FormGroup;
  frameName: string;
  userRequestId: number;
  size: number;
  material: string;
  color: string;
  gender: string;
  description: string;
  frames: Array<Frame>;

  onAddFrame() {
    let frame = new Frame();
    frame.frameName = this.frameName;
    frame.userRequestId = this.userRequestId;
    frame.gender = this.gender;
    frame.color = this.color;
    frame.material = this.material;
    frame.size = this.size;
    frame.description = this.description;
    this.frames.push(frame);
  }

  onRemoveFrame(frame){
    let index = this.frames.indexOf(frame);
    this.frames.splice(index,1);
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());

  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      fnmae: "",
      id: "",
      gender: "",
      size: "",
      color: "",
      material: "",
      comment: ""
    });
  }
  getFrameDetails() {
    this.rows.push(this.createBulkFrames());
  }

  createBulkFrames(): FormGroup {

    return this.fb.group({
      fnmae: "",
      id: "",
      gender: "",
      size: "",
      color: "",
      material: "",
      comment: ""
    });
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.frames = [];
    this.addForm = this.fb.group({
      userRequestType: ['B']
    });
    this.rows = this.fb.array([]);

  }

  ngOnInit() {


    this.addForm.addControl('frameRequests', this.rows);
  }

  validateFrames(){

  }

}

