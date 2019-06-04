import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayByHourComponent } from './day-by-hour.component';

describe('DayByHourComponent', () => {
  let component: DayByHourComponent;
  let fixture: ComponentFixture<DayByHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayByHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayByHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
