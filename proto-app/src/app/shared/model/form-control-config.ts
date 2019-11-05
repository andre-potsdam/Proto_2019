import { Subject } from 'rxjs';

export class FormControlConfig {

  // Name for technical purposes. No whitespaces.
  name: string;

  // Label of form row.
  rowLabel?: string;

  // Explaining information for row.
  // NOTE: This is rendered as inner HTML, so HTML tags can be used!
  infoText?: string;

  // Info text is only displayed, if showInfo==true and infoText is defined.
  private _showInfo: boolean;

  get showInfo() {
    return this._showInfo;
  }

  // Special setter in order to ensure, that only one info text is visible per form.
  set showInfo(showInfo) {
    if (this._showInfo === showInfo) {
      return;
    }
    this._showInfo = showInfo;
    this.showInfoSubject.next(this);
  }

  readonly showInfoSubject = new Subject<FormControlConfig>();

  // Keys for language dependent properties.
  readonly keyForRowLabel: string;
  readonly keyForInfoText: string;

  constructor(name: string, showInfo: boolean) {
    this.name = name;
    this.showInfo = showInfo;

    this.keyForRowLabel = this.name + '_rowLabel';
    this.keyForInfoText = this.name + '_infoText';
  }


  // Update all language dependent strings from given properties.
  // Following properties MUST be defined in given map:
  //    <name>_rowLabel
  //    <name>_infoText
  //
  updateLanguageStrings(properties: any) {
    this.rowLabel = this.getLanguageString(properties, this.keyForRowLabel);
    this.infoText = this.getLanguageString(properties, this.keyForInfoText);
  }

  getLanguageString(properties: any, key: string) {
    if (properties.hasOwnProperty(key)) {
      return properties[key];
    } else {
      throw new Error('missing property ' + key);
    }
  }
}
