import { Component, OnInit } from '@angular/core';
import { DonorRequest } from '../donor-input/models/donor.request.model';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DonRequestService } from '../donor-input/donor-request-service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-process-donor-envelope',
  templateUrl: './process-donor-envelope.component.html',
  styleUrls: ['./process-donor-envelope.component.css'],
  providers: [DonRequestService]
})
export class ProcessDonorEnvelopeComponent implements OnInit {
  private rowData: DonorRequest;
  private columnDefs: ColDef[];
  private defaultColDef;
  private rowSelection;
  private gridApi;
  private gridColumnApi;
  private getRowHeight;
  private getRowNodeId;
  private domLayout;
  constructor(private donRequest: DonRequestService, private logger: NGXLogger) {
    this.columnDefs = this.createColumnDefs();
    this.rowSelection = "single";
    this.domLayout = "autoHeight";
    this.getRowHeight = function (params) {
      var address = params.data.user.address;
      var length = address.addressLine1.length + address.addressLine2.length + address.city.length + address.state.length + address.zipcode.length + address.country.length;
      return 28 * (Math.floor(length / 60) + 1);
    };

    this.getRowNodeId = function(data) {
      return data.id;
    };
  }

  ngOnInit() {
    this.donRequest.findByStatus().subscribe(
      DonorRequest => {
        this.rowData = DonorRequest
      },
      error => {
        this.logger.debug("Error recieved" + JSON.stringify(error));
      }
    )
  }

  /*
  Invokes the Patch Donor Request Rest API 
  */
  markAsSent() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.logger.debug("Selected rows" + selectedRows);
    // Invoking Patch rest API,
    // Updating the status as "DON_REQ_PREPAID_SENT"
    var logger = this.logger;
    var donRequest = this.donRequest;
    var gridApi = this.gridApi;
    selectedRows.forEach(function (selectedRow, index) {
      logger.debug("selected Id" + selectedRow.id);
      let observer = donRequest.updateStatus(selectedRow.id);
      observer.subscribe((data: DonorRequest) => {
      // updating the status instatntly
       var rowNode = gridApi.getRowNode(selectedRow.id);
       rowNode.setDataValue("status","DON_REQ_PREPAID_SENT");
        //selected rows  will be removed from grid
        // var itemsToUpdate = [{"status":"DON_REQ_PREPAID_SENT"}];
        //  gridApi.updateRowData({ update: itemsToUpdate });
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
    this.gridApi.sizeColumnsToFit();
    
  }

  private createColumnDefs() {
    return [
      { field: 'id', headerName: 'Donor Request ID', resizable: false, checkboxSelection: true },
      { field: 'status', headerName: 'Status', resizable: false },
      {field:'envelopeSize',headerName:'Frame Count',resizable: false  },
      {
        field: 'name', headerName: 'Name', resizable: false, valueGetter: (params) => {
          if (!params.data.user) return '';
          return params.data.user.name;
        }
      },
      {
        field: 'addressLine1', headerName: 'Address',  resizable: true, cellStyle: { "white-space": "normal" }, valueGetter: (params) => {

          if (params.data.user && params.data.user.address) {
            var addr = params.data.user.address;
            let addressLine1 = addr.addressLine1 ? addr.addressLine1 : '';
            let addressLine2 = addr.addressLine2 ? addr.addressLine2 : '';
            let city = addr.city ? addr.city : ''
            let state = addr.state ? addr.state : '';
            let country = addr.country ? addr.country : '';
            let zipcode = addr.zipcode ? addr.zipcode : '';
            return addressLine1 + "\n" + addressLine2 + "\n" + city + "\n" + state + "\n" + country + "\n" + zipcode;
          }
        }
      }
    ]
  }
}
