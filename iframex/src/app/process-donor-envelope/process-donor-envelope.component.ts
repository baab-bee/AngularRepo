import { Component, OnInit } from '@angular/core';
import { DonorRequest } from '../donor-input/models/donor.request.model';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { UserRequestService } from './user-request-service';

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

    constructor(private userRequest: UserRequestService) {
      this.columnDefs = this.createColumnDefs();
      this.rowSelection = "multiple";
    }
      // this.http.get('http://localhost:8080/userRequests').subscribe((data)=>{

    // this.rowData=data;
    // });
    ngOnInit() {
    this.userRequest.findAll().subscribe(
      UserRequest => {
        this.rowData = UserRequest
      },
      error => {
        console.log(error);
      }
    )
   }

   onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log("Hello" + selectedRows);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  private createColumnDefs() {
    return [
      { field: 'id' ,   checkboxSelection: true },
      { field: 'status' },
      {
        field: 'name', valueGetter: (params) => {
          if (!params.data.user) return '';
          return params.data.user.name;
        }
      },
      {
        field: 'addressLine1', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.addressLine1) return '';
          return params.data.user.address.addressLine1;
        }
      }, 
      {
        field: 'addressLine2', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.addressLine2) return '';
          return params.data.user.address.addressLine2;
        }
      },
      {
        field: 'city', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.city) return '';
          return params.data.user.address.city;
        }
      },
      {
        field: 'state', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.state) return '';
          return params.data.user.address.state;
        }
      },
      {
        field: 'country', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.country) return '';
          return params.data.user.address.country;
        }
      },
      {
        field: 'zipcode', valueGetter: (params) => {
          if (!params.data.user || !params.data.user.address || !params.data.user.address.zipcode) return '';
          return params.data.user.address.zipcode;
        }
      } 
    ]
  }
}
