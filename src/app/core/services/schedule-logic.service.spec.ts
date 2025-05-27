import { TestBed } from '@angular/core/testing';

import { ScheduleLogicService } from './schedule-logic.service';

describe('ScheduleLogicService', () => {
  let service: ScheduleLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
