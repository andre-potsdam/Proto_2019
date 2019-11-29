import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PageConfig } from 'src/app/shared/model/page-config';
import { PageState } from 'src/app/shared/model/page-state.enum';
import { DataState } from 'src/app/shared/model/data-state.enum';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { PageListProperties } from './page-list.properties';
import { Language } from 'src/app/shared/model/language.enum';
import { Page010SituationPropertiesEn } from '../page010-situation/page010-situation.properties.en';
import { Page010SituationPropertiesDe } from '../page010-situation/page010-situation.properties.de';
import { PageListPropertiesEn } from './page-list.properties.en';
import { PageListPropertiesDe } from './page-list.properties.de';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('300ms ease-in', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, height: '0px' }))
      ])
    ]),
  ],
})


export class PageListComponent implements OnInit {

  pageConfigs: PageConfig[];

  properties: PageListProperties;


  constructor(private configService: ConfigurationService) {
    console.log('enter PageListComponent.constructor()');
  }

  ngOnInit() {
    console.log('enter PageListComponent.ngOnInit()');

    this.initConfig();
    this.updateLanguageStrings();

    // subscribe
    this.configService.languageSubject.subscribe(language => this.updateLanguageStrings());
  }

  initConfig() {
    this.pageConfigs = [
      new PageConfig('situation', PageState.SHOW_EDITOR),
      new PageConfig('vehicle', PageState.HIDDEN),
      new PageConfig('drivers', PageState.HIDDEN),
      new PageConfig('insurance', PageState.HIDDEN),
    ];
  }

  updateLanguageStrings() {
    switch (this.configService.getLanguage()) {
      case Language.EN: {
        this.properties = new PageListPropertiesEn();
        break;
      }
      default: {
        this.properties = new PageListPropertiesDe();
      }
    }

    for (const pageConfig of this.pageConfigs) {
      pageConfig.updateLanguageStrings(this.properties);
    }
  }


  // This is invoked, if data in an editor were confirmed.
  pageConfirmed(index: number) {
    console.log('enter PageListComponent.pageConfirmed(' + index + ')');
    const confirmedPage = this.pageConfigs[index];

    // this page: confirm data, collapse editor
    confirmedPage.dataState = DataState.CONFIRMED;
    confirmedPage.pageState = PageState.COLLAPSED;

    // search next page, which is NOT confirmed yet (there must be at least one!)
    for (let i = index + 1; i < this.pageConfigs.length; i++) {
      const page = this.pageConfigs[i];
      if (page.dataState == null || page.dataState === DataState.DIRTY) {
        // * --> SHOW_EDITOR
        page.dataState = DataState.DIRTY;
        page.pageState = PageState.SHOW_EDITOR;
        break;
      }
    }
  }


  // This is invoked, if one page header is clicked.
  pageHeaderClicked(index: number) {
    console.log('enter PageListComponent.pageHeaderClicked(' + index + ')');
    const clickedPage = this.pageConfigs[index];

    if (clickedPage.pageState === PageState.SHOW_EDITOR) {
      return;   // there must be always one editor open
    }

    if (clickedPage.pageState === PageState.COLLAPSED) {
      if (clickedPage.dataState === DataState.CONFIRMED) {
        // COLLAPSED --> SHOW_VIEWER
        clickedPage.pageState = PageState.SHOW_VIEWER;
      }
    } else if (clickedPage.pageState === PageState.SHOW_VIEWER) {
      // SHOW_VIEWER --> COLLAPSED
      clickedPage.pageState = PageState.COLLAPSED;
    }
  }


  // This is invoked, if 'Modify' button in header is clicked.
  pageModifyClicked(event: Event, index: number) {
    console.log('enter PageListComponent.pageModifyClicked(' + index + ')');
    const clickedPage = this.pageConfigs[index];

    event.stopPropagation();

    // this page is in state COLLAPSED or SHOW_EDITOR

    // SHOW_EDITOR/COLLAPSED --> SHOW_EDITOR
    clickedPage.dataState = DataState.DIRTY;
    clickedPage.pageState = PageState.SHOW_EDITOR;

    // hide all subsequent pages
    for (let i = index + 1; i < this.pageConfigs.length; i++) {
      const page = this.pageConfigs[i];
      page.dataState = DataState.DIRTY;
      page.pageState = PageState.HIDDEN;
    }
  }


}