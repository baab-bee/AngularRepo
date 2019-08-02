import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFrameServiceComponent } from './match-frame-service.component';

describe('MatchFrameServiceComponent', () => {
  let component: MatchFrameServiceComponent;
  let fixture: ComponentFixture<MatchFrameServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFrameServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFrameServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
