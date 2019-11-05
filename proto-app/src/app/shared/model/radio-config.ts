import { FormControlConfig } from './form-control-config';
import { SelectItem } from './select-item';

export class RadioConfig extends FormControlConfig {

    // List of options.
    items: SelectItem[];

    constructor(name: string, showInfo: boolean, items: SelectItem[]) {
        super(name, showInfo);
        this.items = items;
    }

    // Update all language dependent strings from given properties.
    // This updates all super class language strings.
    // Further for every select item the labels are set.
    updateLanguageStrings(properties: any) {
        // update rowLabel, infoText
        super.updateLanguageStrings(properties);

        // update item labels
        for (const item of this.items) {
            if (item.labelKey) {
                item.label = this.getLanguageString(properties, item.labelKey);
            } else {
                if (!item.label) {
                    throw new Error('item has labelKey or label: ' + item.value);
                }
            }
        }
     }
}
