import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Read more..';
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.show = !this.show;
  }
}
