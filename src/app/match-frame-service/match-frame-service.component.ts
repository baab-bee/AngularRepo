import { Component, OnInit } from '@angular/core';
import { Frame } from './models/frame.model';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-match-frame-service',
  templateUrl: './match-frame-service.component.html',
  styleUrls: ['./match-frame-service.component.css']
})
export class MatchFrameServiceComponent implements OnInit {
  private rowData: Frame;
  private columnDefs: ColDef[];
  private rowSelection;
  constructor() {
    this.columnDefs = this.createColumnDefs();
    this.rowSelection = "multiple";
   }

  ngOnInit() {
    // this.frameService.findAll().subscribe(
    //   Frame => {
    //     this.rowData = Frame
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

  private createColumnDefs(){
    return [
       {headerName: 'Frame Id', field: 'id'},
       {headerName: 'Gender', field: 'gender'},
       {headerName: 'Size', field: 'size'},
       {headerName: 'Color', field: 'color'},
       {headerName: 'Material', field: 'material'}
      
    ]
  }
}
