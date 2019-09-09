import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FrameRequestService } from '../process-frame-request/frame-request-service';
import { FrameRequest } from '../process-frame-request/models/frame.request.model';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-process-donation',
  templateUrl: './process-donation.component.html',
  styleUrls: ['./process-donation.component.css'],
  providers:[FrameRequestService]
})
export class ProcessDonationComponent implements OnInit {
  private columnDefs: ColDef[];
  private gridApi;
  private rowData: FrameRequest;
  private gridColumnApi;
  private getRowHeight;
  private rowSelection;
  constructor(private frameRequests:FrameRequestService, private logger: NGXLogger) {
    this.columnDefs = this.createColumnDefs();
    this.rowSelection = "single";

    this.getRowHeight = function (params) {
      var address = params.data.beneficary_address;
      var length = address.length;
      return 28 * (Math.floor(length / 60) + 1);
   }
  }
  ngOnInit() {
    this.frameRequests.findbyStatus().subscribe(
      FrameRequest => {
        this.rowData = FrameRequest
      },
      error => {
        this.logger.debug("Error recieved" + JSON.stringify(error));
      }
    )
  }
    /*
  Invokes the Patch Donor Request Rest API 
  */
 markAsProcessed() {
  var selectedRows = this.gridApi.getSelectedRows();
  this.logger.debug("Selected rows" + selectedRows);
  // Invoking Patch rest API,
  // Updating the status as "DON_REQ_PREPAID_SENT"
  var logger = this.logger;
  var frameRequest = this.frameRequests;
  var gridApi = this.gridApi;
  selectedRows.forEach(function (selectedRow, index) {
    logger.debug("selected Id" + selectedRow.id);
    let observer = frameRequest.updateStatus(selectedRow.id);
    observer.subscribe((data: FrameRequest) => {
      //selected rows  will be removed from grid
      // var itemsToUpdate = [{"status":"DON_REQ_PREPAID_SENT"}];
        gridApi.updateRowData({ remove: selectedRows });
      var status = data["status"];
      logger.debug("Status" + status);
      logger.debug("Response  recieved" + JSON.stringify(data));
    },
      error => {
        logger.debug("Error recieved" + JSON.stringify(error));
      }
    )
  });

}
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.gridApi.sizeColumnsToFit();
  }
  private createColumnDefs() {
    return [
      { field: 'beneficiaryRequest_id', headerName: 'Beneficiary ID', resizable: false, checkboxSelection: true },
      { field: 'beneficiary_name', headerName: 'Beneficiary Name', resizable: false },
      { field: 'beneficary_address', width: 350, resizable: true, cellStyle: { "white-space": "normal" },headerName: 'Beneficiary Address'},
      {
        field: 'size', headerName: 'Frame Request Information', width: 200, resizable: true, cellStyle: { "white-space": "normal" }, valueGetter: (params) => {

          
            let size = params.data.size ? params.data.size : '';
            let color = params.data.color ? params.data.size: '';
            let material = params.data.material ? params.data.material : ''
            let gender = params.data.gender ? params.data.gender : '';
            return "Size:" + size +",\n" + "Gender:"+gender + ",\n" +"Color:"+color + ",\n" + "Material:"+material;
        }
        },
        {
          field: 'color', headerName: 'Matched Frame Information', width: 200, resizable: true, cellStyle: { "white-space": "normal" }, valueGetter: (params) => {
            if (params.data.frame) {
              var frame = params.data.frame;
              let fSize = frame.size ? frame.size : '';
              let fColor = frame.color ? frame.color : '';
              let fMaterial =frame.material ? frame.material: ''
              let fGender = frame.gender ? frame.gender : '';
              return "Size:" + fSize +",\n" + "Gender:"+fGender + ",\n" +"Color:"+fColor + ",\n" + "Material:"+fMaterial;
            }
          }
        }
    ]
  }
}
