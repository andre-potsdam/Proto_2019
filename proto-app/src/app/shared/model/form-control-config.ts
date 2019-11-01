import { Observable, Subject, Observer } from 'rxjs';

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

  constructor(name: string, rowLabel: string, infoText: string, showInfo: boolean) {
    this.name = name;
    this.rowLabel = rowLabel;
    this.infoText = infoText;
    this.showInfo = showInfo;
  }
}
