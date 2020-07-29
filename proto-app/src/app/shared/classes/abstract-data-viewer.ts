import { OnInit, Directive } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { DataService } from '../services/data.service';
import { SelectItem } from 'src/app/common';
import * as moment from 'moment';

@Directive()
export abstract class AbstractDataViewer<T> implements OnInit {

    constructor(protected configService: ConfigurationService, protected dataService: DataService<T>) {
    }


    ngOnInit() {
        this.info('enter ngOnOnit()');

        this.initData(this.dataService.get());
        this.updateLanguageStrings();

        // subscribe
        this.configService.languageSubject.subscribe(language => this.updateLanguageStrings());
    }


    // Init data items from data service.
    // Invoked once during component init.
    protected abstract initData(data: T): void;



    // Update language dependent strings.
    // Invoked during component init and after every language change.
    protected abstract updateLanguageStrings(): void;


    // Get the select item value key, which matches the given value.
    getValueKey(selectItems: SelectItem[], value: string): string {
        for (const selectItem of selectItems) {
            if (selectItem.value === value) {
                return selectItem.labelKey;
            }
        }
        return null;
    }


    protected info(s: string): void {
        const c: any = this.constructor;
        console.log(c.name + ': ' + s);
    }

}