import { Utils } from '../util/utils';

export class DataItem {

    // key for language dependent label text
    labelKey: string;

    // label text, will be shown shown at GUI
    label: string;

    // key for language dependent value (e.g. select item)
    valueKey: string;

    // internal value of this item
    value: string;


    constructor(labelKey: string, value?: string) {
        this.labelKey = labelKey;
        this.value = value;
    }


    updateLanguageStrings(properties: any) {
        if (this.labelKey) {
            this.label = Utils.getLanguageString(properties, this.labelKey);
        }
        if (this.valueKey) {
            this.value = Utils.getLanguageString(properties, this.valueKey);
        }
    }

}
