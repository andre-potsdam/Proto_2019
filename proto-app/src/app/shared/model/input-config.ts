import { FormControlConfig } from './form-control-config';

export class InputConfig extends FormControlConfig {

    constructor(name: string, type: string, showInfo: boolean) {
        super(name, showInfo);
    }
}
