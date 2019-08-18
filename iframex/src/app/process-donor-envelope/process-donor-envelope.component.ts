import { Component, OnInit } from '@angular/core';
import { DonorRequest } from '../donor-input/models/donor.request.model';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { UserRequestService } from './user-request-service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-process-donor-envelope',
  templateUrl: './process-donor-envelope.component.html',
  styleUrls: ['./process-donor-envelope.component.css'],
  providers: [UserRequestService]
})
export class ProcessDonorEnvelopeComponent implements OnInit {
  private rowData: DonorRequest;
  private columnDefs: ColDef[];
  private defaultColDef;
  private rowSelection;
  private gridApi;
  private gridColumnApi;
  private getRowHeight;

  constructor(private userRequest: UserRequestService, private logger: NGXLogger) {
    this.columnDefs = this.createColumnDefs();
    this.rowSelection = "multiple";
    // var allColumnIds = [];
    // this.gridColumnApi.getAllColumns().forEach(function(column) {
    //   allColumnIds.push(column.colId);
    // });
    // this.gridColumnApi.autoSizeColumns(allColumnIds);

    this.getRowHeight = function (params) {
      var address = params.data.user.address;
      var length = address.addressLine1.length + address.addressLine2.length + address.city.length +address.state.length+address.zipcode.length+address.country.length;
      return 28 * (Math.floor(length / 60) + 1);
    };
  }

  ngOnInit() {
    this.userRequest.findAll().subscribe(
      UserRequest => {
        this.rowData = UserRequest
      },
      error => {
        this.logger.debug("Error recieved" + JSON.stringify(error));
      }
    )
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.logger.debug("Selected rows" + selectedRows);
  }
  markAsSent(){
    var selectedRows = this.gridApi.getSelectedRows();
    this.logger.debug("Selected rows" + selectedRows);
    window.alert("SelectedRows"+selectedRows);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

  }

  private createColumnDefs() {
    return [
      { field: 'id', headerName: 'DonorRequestId', resizable: false, checkboxSelection: true },
      { field: 'status', headerName: 'Status', resizable: false },
      {
        field: 'name', headerName: 'Name', resizable: false, valueGetter: (params) => {
          if (!params.data.user) return '';
          return params.data.user.name;
        }
      },
      {
        field: 'addressLine1', headerName: 'Address', width:450, resizable: true, cellStyle: { "white-space": "normal" }, valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.addressLine1) return '';
          let addressLine1 = params.data.user.address.addressLine1;
          if (!params.data.user || !params.data.user.address || !params.data.user.address.addressLine2) return '';
          let addressLine2 = params.data.user.address.addressLine2;
          if (!params.data.user || !params.data.user.address || !params.data.user.address.city) return '';
          let city = params.data.user.address.city;
          if (!params.data.user || !params.data.user.address || !params.data.user.address.state) return '';
          let state = params.data.user.address.state;
          if (!params.data.user || !params.data.user.address || !params.data.user.address.country) return '';
          let country = params.data.user.address.country;
          if (!params.data.user || !params.data.user.address || !params.data.user.address.zipcode) return '';
          let zipcode = params.data.user.address.zipcode;
          return addressLine1 + "\n" + addressLine2 + "\n" + city + "\n" + state + "\n" + country + "\n" + zipcode;
        }
      }
    ]
  }
}
