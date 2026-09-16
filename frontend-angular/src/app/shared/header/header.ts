import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [MatTabsModule, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrls: [],
  templateUrl: './header.html',
})
export class Header {
  readonly navLinks = [
    { path: '/book', label: 'Books' },
  ];
}
