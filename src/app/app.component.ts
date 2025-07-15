import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MED-LEMBRETE';

  constructor(
    private titleService: Title,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeData = this.router.routerState.snapshot.root.firstChild?.data;
        if (routeData && routeData['title']) {
          this.titleService.setTitle(routeData['title']);
        }
      });
  }
}