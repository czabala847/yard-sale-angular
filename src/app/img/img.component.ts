import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  constructor() {}

  defaultImage: string = './assets/images/defaultjpg.jpg';

  @Input() url: string = '';
  @Output() loaded = new EventEmitter<string>();

  ngOnInit(): void {}

  imageError() {
    this.url = this.defaultImage;
  }

  imageLoaded() {
    console.log('Hijo');
    this.loaded.emit(this.url);
  }
}
