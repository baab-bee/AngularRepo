import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FrameRequest } from './models/frame.request.model';
import { FrameRequestService } from './frame-request-service';
import { DonorComponent } from '../donor/donor.component';
import { MatchFrameComponent } from '../match-frame/match-frame.component';

@Component({
  selector: 'app-process-frame-request',
  templateUrl: './process-frame-request.component.html',
  styleUrls: ['./process-frame-request.component.css'],
  providers: [FrameRequestService]
})
export class ProcessFrameRequestComponent implements OnInit {
  private rowData :FrameRequest;
  private columnDefs: ColDef[];
  private frameworkComponents;
  constructor(private frameRequest: FrameRequestService) {
    this.columnDefs = this.createColumnDefs();
    this.frameworkComponents = {
    matchframeComponent: MatchFrameComponent
    };

   }

  ngOnInit() {
    console.log("ngOnInit");
    this.frameRequest.findAll().subscribe(
      FrameRequest => {
        console.log("inside frameRequest"+ FrameRequest);
        this.rowData = FrameRequest;
      },
      error => {
        console.log(error);
      }
    )
  }
  private createColumnDefs(){
    return [
       {headerName: 'Frame Id', field: 'id'},
       {headerName: 'Gender', field: 'gender'},
       {headerName: 'Size', field: 'size'},
       {headerName: 'Color', field: 'color'},
       {headerName: 'Material', field: 'material'},
       {headerName: 'Action' , field: "value", cellRenderer: "matchframeComponent",  colId: "params" }
      
    ]
  }
}
