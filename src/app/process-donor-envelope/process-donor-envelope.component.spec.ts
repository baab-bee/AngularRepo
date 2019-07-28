import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDonorEnvelopeComponent } from './process-donor-envelope.component';

describe('ProcessDonorEnvelopeComponent', () => {
  let component: ProcessDonorEnvelopeComponent;
  let fixture: ComponentFixture<ProcessDonorEnvelopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDonorEnvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDonorEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
