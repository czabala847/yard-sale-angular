import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

import { UserCreateDTOInterface } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'store';
  urlPadre: string = '';
  token: string = '';
  imgResult: string = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile().subscribe();
    }
  }

  handleLoaded(img: string) {
    console.log('padre', img);
  }

  createUser() {
    const user: UserCreateDTOInterface = {
      name: 'Carlos',
      email: 'carlos@example.com',
      password: '112233',
    };

    this.usersService.create(user).subscribe((data) => {
      console.log(data);
    });
  }

  login() {
    this.authService.login('carlos@example.com', '112233').subscribe((data) => {
      console.log('token', data);
      this.token = data.access_token;
    });
  }

  getProfile() {
    this.authService.profile().subscribe((data) => console.log(data));
  }

  downloadPDF() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  handleChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {
      this.filesService.uploadFile(file).subscribe((data) => {
        this.imgResult = data.location;
      });
    }
  }
}
