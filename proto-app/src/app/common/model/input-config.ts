import { FormControlConfig } from './form-control-config';

export class InputConfig extends FormControlConfig {

    postfixKey: string;

    postfix: string;

    public maxlength: number;


    constructor(name: string, public type: string, showInfo: boolean) {
        super(name, showInfo);
    }

    setMaxLength(maxlength: number) {
        this.maxlength = maxlength;
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
