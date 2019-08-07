import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

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
    this.params = params;
}
  

}
