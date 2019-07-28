import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorInputComponent } from './donor-input.component';

describe('DonorInputComponent', () => {
  let component: DonorInputComponent;
  let fixture: ComponentFixture<DonorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
