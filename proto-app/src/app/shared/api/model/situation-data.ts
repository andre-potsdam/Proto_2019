import { Situation } from './situation.enum';
import * as moment from 'moment';

export interface SituationData {

    situation: Situation;

    insuranceBegin?: moment.Moment;

}
