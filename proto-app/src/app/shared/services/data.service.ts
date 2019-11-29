import { DataState } from '../model/data-state.enum';


export interface DataService<T> {

    get(): T;

    save(data: T, dataState: DataState): void;

    getDataState(): DataState;

    setDataState(dataState: DataState): void;
}
