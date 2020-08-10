import { Component, OnInit } from '@angular/core';
import { AbstractDataViewer, ConfigurationService, DataItem, Language, VehicleData, VehicleDataService } from 'src/app/shared';
import { Page020VehicleProperties } from '../page020-vehicle/page020-vehicle.properties';
import { Page020VehiclePropertiesDe } from '../page020-vehicle/page020-vehicle.properties.de';
import { Page020VehiclePropertiesEn } from '../page020-vehicle/page020-vehicle.properties.en';
import { Page020VehicleStaticData } from '../page020-vehicle/page020-vehicle.staticData';
import { Page020VehiclePropertiesEs } from './../page020-vehicle/page020-vehicle.properties.es';

@Component({
  selector: 'app-page020-vehicle-viewer',
  templateUrl: './page020-vehicle-viewer.component.html',
  styleUrls: ['./page020-vehicle-viewer.component.scss']
})
export class Page020VehicleViewerComponent extends AbstractDataViewer<VehicleData> implements OnInit {

  properties: Page020VehicleProperties;

  manufYearItem: DataItem;
  purchaseYearItem: DataItem;
  hsnTsnItem: DataItem;
  vehicleDescriptionItem: DataItem;
  financingItem: DataItem;

  vehicleManufacturerImage: string;



  constructor(configService: ConfigurationService, dataService: VehicleDataService) {
    super(configService, dataService);
  }


  // @override
  protected initData(data: VehicleData) {

    this.manufYearItem = new DataItem('manufYear_rowLabel', String(data.manufYear));
    this.purchaseYearItem = new DataItem('purchaseYear_rowLabel', String(data.purchaseYear));
    this.hsnTsnItem = new DataItem('hsntsn_rowLabel', data.hsn + ' / ' + data.tsn);
    this.vehicleDescriptionItem = new DataItem('vehicleDescription_rowLabel', data.manufacturer + ' ' + data.model);
    this.financingItem = new DataItem('financing_rowLabel');
    this.financingItem.valueKey = this.getValueKey(Page020VehicleStaticData.financingItems, data.financing);

    if (data.manufacturer) {
      this.vehicleManufacturerImage = 'assets/manufacturer/' + data.manufacturer.toLowerCase() + '.png';
    }
  }


  // @override
  protected updateLanguageStrings() {

    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new Page020VehiclePropertiesEn();
        break;
      }
      case Language.ES: {
        this.properties = new Page020VehiclePropertiesEs();
        break;
      }
      default: {
        this.properties = new Page020VehiclePropertiesDe();
      }
    }

    this.manufYearItem.updateLanguageStrings(this.properties);
    this.purchaseYearItem.updateLanguageStrings(this.properties);
    this.hsnTsnItem.updateLanguageStrings(this.properties);
    this.vehicleDescriptionItem.updateLanguageStrings(this.properties);
    this.financingItem.updateLanguageStrings(this.properties);

  }

}
