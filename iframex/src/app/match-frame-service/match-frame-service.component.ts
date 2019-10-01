import { Component, OnInit } from '@angular/core';
import { Frame } from './models/frame.model';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FrameService } from './frame-service';
import { NGXLogger } from 'ngx-logger';
import { FrameRequest } from '../process-frame-request/models/frame.request.model';

@Component({
  selector: 'app-match-frame-service',
  templateUrl: './match-frame-service.component.html',
  styleUrls: ['./match-frame-service.component.css'],
  providers:[FrameService]
})
export class MatchFrameServiceComponent implements OnInit {
  private rowData: Frame;
  private gridApi;
  private gridColumnApi;
  private columnDefs: ColDef[];
  private rowSelection;
  state$: Observable<object>;
 private state;
  constructor(public router: Router, private logger: NGXLogger,public activatedRoute: ActivatedRoute, private frameService:FrameService) {
    this.columnDefs = this.createColumnDefs();
    this.rowSelection = "single";
  //   const navigation = this.router.getCurrentNavigation();
  //  const state = navigation.extras.state as {example: string};
  //  console.log("In Component" +state.example);
   // this.example = state.example;
   this.state = this.router.getCurrentNavigation().extras.state;

  //     this.state$ = this.router.events.pipe(
  //   filter(e => e instanceof NavigationStart),
  //   map(() => {
  //     const currentNav = this.router.getCurrentNavigation();
  //     return currentNav.extras.state;
  //   })
  // );
   }

  ngOnInit() {

    console.log("Im nu" +JSON.stringify(this.state));
    this.frameService.matchFrameRequest(this.state).subscribe(
      Frame => {
        this.rowData = Frame;
        this.logger.debug("Frame  recieved" + JSON.stringify(this.rowData));
      },
      error => {
        this.logger.debug("Error recieved" + JSON.stringify(error));
      }
    )
   // console.log("histoetyy" +history.state.data);

  //  this.state$ = this.router.events.pipe(
  //   filter(e => e instanceof NavigationStart),
  //   map(() => {
  //     const currentNav = this.router.getCurrentNavigation();
  //     return currentNav.extras.state;
  //   })
  // );

 // console.log("statee" +this.state$);
    //this.state$ = this.activatedRoute.paramMap
      //.pipe(map(() => window.history.state))
      //console.log("histoetyy" + JSON.stringify(this.state$));
    // this.frameService.findAll().subscribe(
    //   Frame => {
    //     this.rowData = Frame
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
    /*
  Invokes the Patch Donor Request Rest API 
  */
 markAsMatched() {
  var selectedRows = this.gridApi.getSelectedRows();
  this.logger.debug("Selected rows" + JSON.stringify(selectedRows));
  this.logger.debug("State is" +JSON.stringify(this.state.id));
  // Invoking Patch rest API,
  // Updating the status as "DON_REQ_PREPAID_SENT"
  var logger = this.logger;
  var donRequest = this.frameService;
  var gridApi = this.gridApi;
  var id = this.state.id;
  var pageRouter = this.router;
  selectedRows.forEach(function (selectedRow, index) {
    logger.debug("selected Id" + selectedRow.id);
    output :JSON;
    var updateReq: any = {};
     updateReq.id = id;
     updateReq.status = "FRAME_REQ_MATCHED";
     updateReq.frame = selectedRow;
     updateReq.frame.status = "FRAME_MATCHED";
    //   "id": id,;
    //   "status":"FRAME_REQ_MATCHED",
    //   frame: selectedRow
    // };
  //  this.output = <JSON>this.obj;
     let observer = donRequest.updateStatus(updateReq);
      observer.subscribe((data: FrameRequest) => {
    //   //selected rows  will be removed from grid
    //   // var itemsToUpdate = [{"status":"DON_REQ_PREPAID_SENT"}];
    //   //  gridApi.updateRowData({ update: itemsToUpdate });
        var status = data["status"];
       logger.debug("Status" + status);
       logger.debug("Response  recieved" + JSON.stringify(data));
       pageRouter.navigate(['../processFrame']);
     },
      error => {
        logger.debug("Error recieved" + JSON.stringify(error));
      }
   )
  });

}
  private createColumnDefs(){
    return [
       {headerName: 'Frame Id', field: 'id', checkboxSelection: true},
       {headerName: 'Gender', field: 'gender'},
       {headerName: 'Size', field: 'size'},
       {headerName: 'Color', field: 'color'},
       {headerName: 'Material', field: 'material'}
      
    ]
  }
}
