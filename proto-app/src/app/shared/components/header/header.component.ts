import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
  }

  toggleLanguage() {
    this.configService.toggleLanguage();
  }
}
