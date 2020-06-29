import { TestBed } from '@angular/core/testing';

import { SituationDataService } from './situation-data.service';
import { SituationData } from '../api/model/situation-data';
import { Situation } from '../api/model/situation.enum';
import * as moment from 'moment';
import { DataState } from '../model/data-state.enum';


/* Test AbstractDataService once with SituationDataService. */
describe('SituationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    expect(service).toBeTruthy();
  });


  it('should return null initially', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    expect(service.get()).toBeUndefined();
  });


  it('should save data', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    const data: SituationData = { situation: Situation.EXISTING_CAR, insuranceBegin: moment() };
    service.save(data, DataState.DIRTY);
  });


  it('should return data', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    const time: moment.Moment =  moment();
    const data: SituationData = { situation: Situation.EXISTING_CAR, insuranceBegin: time };
    service.save(data, DataState.DIRTY);

    const data2 = service.get();
    expect(data2.situation).toBe(Situation.EXISTING_CAR);
    expect(data2.insuranceBegin).toBe(time);

    const state = service.getDataState();
    expect(state).toBe(DataState.DIRTY);
  });


  it('should allow to update data state', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    const time: moment.Moment =  moment();
    const data: SituationData = { situation: Situation.EXISTING_CAR, insuranceBegin: time };
    service.save(data, DataState.DIRTY);

    expect(service.getDataState()).toBe(DataState.DIRTY);
    service.setDataState(DataState.CONFIRMED);
    expect(service.getDataState()).toBe(DataState.CONFIRMED);
  });
});

