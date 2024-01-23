import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPeriodComponent } from './report-period.component';

describe('ReportPeriodComponent', () => {
  let component: ReportPeriodComponent;
  let fixture: ComponentFixture<ReportPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
