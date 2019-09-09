import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFrameRequestComponent } from './process-frame-request.component';

describe('ProcessFrameRequestComponent', () => {
  let component: ProcessFrameRequestComponent;
  let fixture: ComponentFixture<ProcessFrameRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFrameRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFrameRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
