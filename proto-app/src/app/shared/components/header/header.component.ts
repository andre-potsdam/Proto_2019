import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { Language } from '../../model/language.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  static readonly IMAGE_GERMANY = 'assets/germany.png';
  static readonly IMAGE_UK = 'assets/uk.png';
  static readonly IMAGE_SPAIN = 'assets/spain.png';


  languageImage: string;

  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.languageImage = HeaderComponent.IMAGE_GERMANY;
  }

  toggleLanguage() {
    this.configService.toggleLanguage();
    switch (this.configService.getLanguage()) {
      case Language.EN:
        this.languageImage = HeaderComponent.IMAGE_UK;
        break;
      case Language.ES:
        this.languageImage = HeaderComponent.IMAGE_SPAIN;
        break;
      default:
        this.languageImage = HeaderComponent.IMAGE_GERMANY;
        break;
    }
  }
}
