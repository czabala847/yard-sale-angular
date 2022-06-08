import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  constructor() {}

  defaultImage: string = './assets/images/defaultjpg.jpg';

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();

  ngOnInit(): void {}

  imageError() {
    this.img = this.defaultImage;
  }

  //Enviar al componente padre
  imageLoaded() {
    console.log('Hijo');
    this.loaded.emit(this.img);
  }
}
