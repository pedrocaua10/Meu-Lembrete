import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader = true;
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/login', '/registro'].includes(event.url);
        this.showSidebar = !['/login', '/registro', '/reset-senha'].includes(event.url);
      }
    });
  }
}