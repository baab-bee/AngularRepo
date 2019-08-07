import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFrameComponent } from './match-frame.component';

describe('MatchFrameComponent', () => {
  let component: MatchFrameComponent;
  let fixture: ComponentFixture<MatchFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
