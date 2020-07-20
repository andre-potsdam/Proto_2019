import { FormControlConfig } from '../../common/model/form-control-config';

export class ConfigGroup {

    private readonly formControlConfigs: FormControlConfig[];

    constructor(...formControlConfigs: FormControlConfig[]) {
        this.formControlConfigs = formControlConfigs;
        for (const formControlConfig of formControlConfigs) {
            formControlConfig.showInfoSubject.subscribe(x => this.handle(x));
        }
    }

    private handle(fcc: FormControlConfig) {
        if (!fcc.showInfo) {
            return;
        }
        // show info was clicked, hide all other info's
        for (const formControlConfig of this.formControlConfigs) {
            if (formControlConfig.name === fcc.name) {
                continue;
            }
            formControlConfig.showInfo = false;
        }
    }

    updateLanguageStrings(properties: any) {
        for (const formControlConfig of this.formControlConfigs) {
            formControlConfig.updateLanguageStrings(properties);
        }
    }
}
