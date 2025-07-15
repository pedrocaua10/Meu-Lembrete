import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>Meu Lembrete</h1>
      <button *ngIf="authService.estaAutenticado()" (click)="logout()">Sair</button>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
  }
}