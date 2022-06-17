import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { UserInterface } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: UserInterface | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.profile().subscribe((data) => {
      this.user = data;
    });
  }
}
