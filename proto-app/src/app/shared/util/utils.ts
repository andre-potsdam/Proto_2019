export class Utils {

    static getLanguageString(properties: any, key: string) {
        if (properties.hasOwnProperty(key)) {
            return properties[key];
        } else {
            throw new Error('missing property ' + key);
        }
    }

}