import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-match-frame',
  templateUrl: './match-frame.component.html',
  styleUrls: ['./match-frame.component.css']
})
export class MatchFrameComponent implements ICellRendererAngularComp  {
  public params: any;
  refresh(): boolean {
   return false;
  }
  agInit(params: any): void {
    console.log("Params****"+params);
    this.params = params;
}
  
constructor(public router: Router){

}

// public invokeParentMethod() {
//   console.log("Rowww" +JSON.stringify(this.params.data));
//   this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
// }

// test(){
//  const navigationExtras: NavigationExtras = {state: {hello: 'This is an example1'}};
//     this.router.navigate(['../matchFrame'], navigationExtras);
// }


navigate() {
  // this.router.navigate(['other']);
  console.log("Rowww" +JSON.stringify(this.params.data));
  this.router.navigate(['../matchFrame'], {
    state: this.params.data
  });
}
}
