import { SituationType } from 'src/app/api';
import * as moment from 'moment';

export interface SituationData {

    situation: SituationType;

    insuranceBegin?: moment.Moment;

}
