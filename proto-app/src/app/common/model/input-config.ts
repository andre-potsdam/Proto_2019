import { FormControlConfig } from './form-control-config';

export class InputConfig extends FormControlConfig {

    postfixKey: string;

    postfix: string;

    constructor(name: string, type: string, showInfo: boolean) {
        super(name, showInfo);
    }

    hasPostfix(): boolean {
        return (this.postfix != null);
    }

    updateLanguageStrings(properties: any) {
        super.updateLanguageStrings(properties);
        if (this.postfixKey) {
            this.postfix = this.getLanguageString(properties, this.postfixKey);
        }
    }

}
