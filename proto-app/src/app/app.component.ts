import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'proto-app';

  constructor() {
    console.log('enter AppComponent.constructor()');
  }
}
