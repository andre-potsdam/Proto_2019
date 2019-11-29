import { Component, OnInit } from '@angular/core';
import { SituationData } from 'src/app/shared/api/model/situation-data';
import { AbstractDataViewer } from 'src/app/shared/classes/abstract-data-viewer';
import { DataItem } from 'src/app/shared/model/data-item';
import { Language } from 'src/app/shared/model/language.enum';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { Page010SituationProperties } from '../page010-situation/page010-situation.properties';
import { Page010SituationPropertiesDe } from '../page010-situation/page010-situation.properties.de';
import { Page010SituationPropertiesEn } from '../page010-situation/page010-situation.properties.en';
import { SituationDataService } from './../../../shared/services/situation-data.service';
import { Page010SituationStaticData } from './../page010-situation/page010-situation.staticData';

@Component({
  selector: 'app-page010-situation-viewer',
  templateUrl: './page010-situation-viewer.component.html',
  styleUrls: ['./page010-situation-viewer.component.css']
})
export class Page010SituationViewerComponent extends AbstractDataViewer<SituationData> implements OnInit {

  properties: Page010SituationProperties;

  situationItem: DataItem;
  insuranceBeginItem: DataItem;


  constructor(configService: ConfigurationService, dataService: SituationDataService) {
    super(configService, dataService);
  }


  // @override
  protected initData(data: SituationData) {

    // situation
    this.situationItem = new DataItem('situationChoice_rowLabel');
    this.situationItem.valueKey = this.getValueKey(Page010SituationStaticData.situationItems, data.situation);

    // (optional) insurance begin
    if (data.insuranceBegin) {
      this.insuranceBeginItem = new DataItem('insuranceBeginChoice_rowLabel', data.insuranceBegin.format('DD.MM.YYYY'));
    }
  }


  // @override
  protected updateLanguageStrings() {

    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page010SituationPropertiesEn();
        break;
      }
      default: {
        this.properties = new Page010SituationPropertiesDe();
      }
    }

    this.situationItem.updateLanguageStrings(this.properties);
    if (this.insuranceBeginItem) {
      this.insuranceBeginItem.updateLanguageStrings(this.properties);
    }
  }

}
