import { DataState } from './data-state.enum';
import { PageState } from './page-state.enum';

export class PageConfig {

    // Internal name for this page. No whitespaces, special chars, etc.
    name: string;

    // Page title in page header.
    pageHeaderTitle?: string;

    // data state is null, DIRTY or CONFIRMED
    dataState: DataState;

    // page state is HIDDEN, COLLAPSED, SHOW_EDITOR or SHOW_VIEWER
    pageState: PageState;

    // Keys for language dependent properties.
    readonly keyForPageHeaderLabel: string;


    constructor(name: string, pageState: PageState) {
        this.name = name;
        this.pageState = pageState;

        this.keyForPageHeaderLabel = this.name + '_pageHeaderTitle';
    }

    isShowEditor(): boolean {
        return this.pageState === PageState.SHOW_EDITOR;
    }

    isShowViewer(): boolean {
        return this.pageState === PageState.SHOW_VIEWER;
    }

    isCollapsed(): boolean {
        return this.pageState === PageState.COLLAPSED;
    }

    isShowHeader() {
        return this.pageState !== PageState.HIDDEN;
    }

    updateLanguageStrings(properties: any) {
        this.pageHeaderTitle = this.getLanguageString(properties, this.keyForPageHeaderLabel);
    }

    getLanguageString(properties: any, key: string) {
        if (properties.hasOwnProperty(key)) {
            return properties[key];
        } else {
            throw new Error('missing property ' + key);
        }
    }
}
