import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {
  title = 'proto-app';

  constructor() {
    console.log('enter AppComponent.constructor()');
  }
}
