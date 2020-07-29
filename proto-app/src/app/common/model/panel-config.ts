
export class PanelConfig {

    name: string;

    title: string;
    content: string;

    // Keys for language dependent properties.
    readonly keyForTitle: string;
    readonly keyForContent: string;

    constructor(name: string) {
        this.name = name;
        this.keyForTitle = this.name + '_title';
        this.keyForContent = this.name + '_content';
     }

    // Update all language dependent strings from given properties.
    // Following properties MUST be defined in given map:
    //    <name>_title
    //    <name>_description
    //
    updateLanguageStrings(properties: any) {
        this.title = this.getLanguageString(properties, this.keyForTitle);
        this.content = this.getLanguageString(properties, this.keyForContent);
    }

    getLanguageString(properties: any, key: string) {
        if (properties.hasOwnProperty(key)) {
            return properties[key];
        } else {
            throw new Error('missing property ' + key);
        }
    }

}
