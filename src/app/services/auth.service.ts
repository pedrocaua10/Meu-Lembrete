import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  updateSenha(email: any, password: any) {
    throw new Error('Method not implemented.');
  }
  setAuthToken(_token: string) {
    throw new Error('Method not implemented.');
  }
  private readonly AUTH_TOKEN_KEY = 'med-lembrete-token';
  http: any;

  constructor(private router: Router) {}

  // Mock de login para desenvolvimento
 login(credentials: any): Observable<any> {
  console.log('Enviando credenciais:', credentials);
  return this.http.post('/api/login', credentials).pipe(
    tap(response => console.log('Resposta do login:', response))
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