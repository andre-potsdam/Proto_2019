
export class FormGroupConfig {

    name: string;

    title: string;
    description: string;

    // Keys for language dependent properties.
    readonly keyForTitle: string;
    readonly keyForDescription: string;

    constructor(name: string) {
        this.name = name;
        this.keyForTitle = this.name + '_title';
        this.keyForDescription = this.name + '_description';
     }

    // Update all language dependent strings from given properties.
    // Following properties MUST be defined in given map:
    //    <name>_title
    //    <name>_description
    //
    updateLanguageStrings(properties: any) {
        this.title = this.getLanguageString(properties, this.keyForTitle);
        this.description = this.getLanguageString(properties, this.keyForDescription);
    }

    getLanguageString(properties: any, key: string) {
        if (properties.hasOwnProperty(key)) {
            return properties[key];
        } else {
            throw new Error('missing property ' + key);
        }
    }

}
