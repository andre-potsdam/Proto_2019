import { RadioConfig } from './radio-config';
import { SelectItem } from './select-item';

export class SelectConfig extends RadioConfig {

    constructor(name: string, showInfo: boolean, items: SelectItem[]) {
        super(name, showInfo, items);
    }
}
