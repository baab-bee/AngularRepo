import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Frame} from './frame.model';
import { NGXLogger } from 'ngx-logger';
import { ReceiveAndValidateService } from './ReceiveAndValidate-service';

@Component({
  selector: 'app-ReceiveAndValidate',
  templateUrl: './ReceiveAndValidate.component.html',
  styleUrls: ['./ReceiveAndValidate.component.css'],
  providers:[ReceiveAndValidateService]
})

export class ReceiveAndValidateComponent implements OnInit {

  rows: FormArray;
  name: string;
  donRequestId: string;
  size: string;
  material: string;
  color: string;
  gender: string;
  remarks: string;
  frames: Array<Frame>;
  submitted = false;  
  response: any;

  onAddFrame() {
     if(!this.size){
      window.alert("Please select valid Frame Size");
      return;
    }
    let frame = new Frame();
    frame.name = this.name;
    frame.donRequestId = this.donRequestId;
    frame.gender = this.gender;
    frame.color = this.color;
    frame.material = this.material;
    frame.size = this.size;
    frame.remarks = this.remarks;
    this.frames.push(frame);
    this.name = "";
    this.gender="";
    this.donRequestId="";
    this.color="";
    this.material="";
    this.remarks="";
    this.size="";

    
    //TODO validate & check for and duplicates
  }

  onRemoveFrame(frame){
    let index = this.frames.indexOf(frame);
    this.frames.splice(index,1);
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private logger: NGXLogger, private ReceiveAndValidateService: ReceiveAndValidateService) {
    this.frames = [];
  }

  ngOnInit() {
  }
  /*Bulk Api call for Receive and validate screen-- http://localhost:8080/frame/frames-bulk*/
  validateFrames(){
    this.submitted = true;
    if (this.frames.length == 0) {
      window.alert("Add atleast one frame to validate");
      return;
    }
    this.logger.debug("receive and validate frames request ::" + JSON.stringify(this.frames));
    let observer = this.ReceiveAndValidateService.validateRequest(this.frames).subscribe((data: any) => {
     // this.response = response;
      this.logger.debug("response" + JSON.stringify(data));
      window.alert("Data Submitted Successfully!");
    });
  
    console.log("Length "+ this.frames);
    var i: number;
    for( i=0; i< this.frames.length; i++) {
    this.frames.splice(i,this.frames.length);
    }
    
  }
}