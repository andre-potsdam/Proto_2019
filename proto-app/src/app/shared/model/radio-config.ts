import { FormControlConfig } from './form-control-config';
import { SelectItem } from './select-item';

export class RadioConfig extends FormControlConfig  {

    // List of options.
    items: SelectItem[];

    constructor(name: string, rowLabel: string, infoText: string, showInfo: boolean, items: SelectItem[]) {
        super(name, rowLabel, infoText, showInfo);
        this.items = items;
    }
}
