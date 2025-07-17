import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'med-lembrete-token';

  constructor(private router: Router) {}

  // Mock de login para desenvolvimento
  login(credentials: any) {
    return of({ token: 'fake-jwt-token' }).pipe(
      delay(800) // Simula tempo de requisição
    );
  }

  // Mock de login com Google
  googleLogin() {
    return of({ token: 'google-auth-token' }).pipe(
      delay(800)
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}