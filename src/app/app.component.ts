import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'store';
  urlPadre: string = '';

  handleLoaded(img: string) {
    console.log('padre', img);
  }
}
