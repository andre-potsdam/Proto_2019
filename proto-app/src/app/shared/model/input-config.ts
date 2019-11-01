import { FormControlConfig } from './form-control-config';

export class InputConfig extends FormControlConfig {

    constructor(name: string, rowLabel: string, infoText: string, showInfo: boolean) {
        super(name, rowLabel, infoText, showInfo);
    }
}
