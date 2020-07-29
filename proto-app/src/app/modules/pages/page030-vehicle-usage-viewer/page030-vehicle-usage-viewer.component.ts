import { Component, OnInit } from '@angular/core';
import { AbstractDataViewer, ConfigurationService, DataItem, Language, VehicleUsageData, VehicleUsageDataService } from 'src/app/shared';
import { Page030VehicleUsageProperties } from '../page030-vehicle-usage/page030-vehicle-usage.properties';
import { Page030VehicleUsagePropertiesDe } from '../page030-vehicle-usage/page030-vehicle-usage.properties.de';
import { Page030VehicleUsagePropertiesEn } from '../page030-vehicle-usage/page030-vehicle-usage.properties.en';
import { Page030VehicleUsageStaticData } from '../page030-vehicle-usage/page030-vehicle-usage.staticData';
import { Page030VehicleUsagePropertiesEs } from './../page030-vehicle-usage/page030-vehicle-usage.properties.es';

@Component({
  selector: 'app-page030-vehicle-usage-viewer',
  templateUrl: './page030-vehicle-usage-viewer.component.html',
  styleUrls: ['./page030-vehicle-usage-viewer.component.scss']
})
export class Page030VehicleUsageViewerComponent extends AbstractDataViewer<VehicleUsageData> implements OnInit {

  properties: Page030VehicleUsageProperties;

  usageKindItem: DataItem;
  milageItem: DataItem;
  seasonPlateChoiceItem: DataItem;
  seasonPlateBeginItem: DataItem;
  seasonPlateEndItem: DataItem;
  homeOwnershipItem: DataItem;
  parkingPlaceItem: DataItem;


  constructor(configService: ConfigurationService, dataService: VehicleUsageDataService) {
    super(configService, dataService);
  }


  // @override
  protected initData(data: VehicleUsageData) {

    this.usageKindItem = new DataItem('usageKind_rowLabel');
    this.usageKindItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.usageKindItems, data.usageKind);

    this.milageItem = new DataItem('milage_rowLabel', String(data.milage));

    this.seasonPlateChoiceItem = new DataItem('seasonPlateChoice_rowLabel');
    this.seasonPlateChoiceItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.seasonPlateChoiceItems,
      (data.isSeasonPlate ? 'true' : 'false'));

    if (data.isSeasonPlate) {
      this.seasonPlateBeginItem = new DataItem('seasonPlateBegin_rowLabel');
      this.seasonPlateBeginItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.seasonPlateMonthItems,
        String(data.seasonPlateBeginMonth));

      this.seasonPlateEndItem = new DataItem('seasonPlateEnd_rowLabel');
      this.seasonPlateEndItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.seasonPlateMonthItems,
        String(data.seasonPlateEndMonth));
    }

    this.homeOwnershipItem = new DataItem('homeOwnership_rowLabel');
    this.homeOwnershipItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.homeOwnershipItems, data.homeOwnership);

    this.parkingPlaceItem = new DataItem('parkingPlace_rowLabel');
    this.parkingPlaceItem.valueKey = this.getValueKey(Page030VehicleUsageStaticData.parkingPlaceItems, data.parkingPlace);
  }


  // @override
  protected updateLanguageStrings() {

    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page030VehicleUsagePropertiesEn();
        break;
      }
      case Language.ES: {
        this.properties = new Page030VehicleUsagePropertiesEs();
        break;
      }
      default: {
        this.properties = new Page030VehicleUsagePropertiesDe();
      }
    }

    this.usageKindItem.updateLanguageStrings(this.properties);
    this.milageItem.updateLanguageStrings(this.properties);
    this.seasonPlateChoiceItem.updateLanguageStrings(this.properties);
    if (this.seasonPlateBeginItem) {
      this.seasonPlateBeginItem.updateLanguageStrings(this.properties);
    }
    if (this.seasonPlateEndItem) {
      this.seasonPlateEndItem.updateLanguageStrings(this.properties);
    }
    this.homeOwnershipItem.updateLanguageStrings(this.properties);
    this.parkingPlaceItem.updateLanguageStrings(this.properties);

  }

}
