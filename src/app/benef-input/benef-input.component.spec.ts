import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefInputComponent } from './benef-input.component';

describe('BenefInputComponent', () => {
  let component: BenefInputComponent;
  let fixture: ComponentFixture<BenefInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
