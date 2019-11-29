import { DataService } from './data.service';
import { DataState } from '../model/data-state.enum';

export abstract class AbstractDataService<T> implements DataService<T> {

    private data: T;

    private dataState: DataState;


    constructor() {}

    get(): T {
        return this.data;
    }

    save(data: T, dataState: DataState): void {
        this.data = data;
        this.dataState = dataState;
    }

    getDataState(): DataState {
        return this.dataState;
    }

    setDataState(dataState: DataState): void {
        if (this.dataState === dataState) {
            return;
        }
        console.log(`state change ${this.dataState}-->${dataState}`);
        this.dataState = dataState;
    }

}
