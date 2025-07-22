import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'usuarioLogado';
  private readonly LOGIN_ATTEMPTS_KEY = 'login_attempts';
  private readonly LOCK_TIME_KEY = 'lock_time';
  private readonly MAX_ATTEMPTS = 3;
  private readonly LOCK_DURATION = 5 * 60 * 1000; // 5 minutos

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<any> {
    // Verifica se a conta está bloqueada
    const lockTime = localStorage.getItem(this.LOCK_TIME_KEY);
    if (lockTime && Date.now() < parseInt(lockTime)) {
      return throwError(() => ({
        status: 403,
        error: { message: 'Conta bloqueada temporariamente. Tente novamente mais tarde.' }
      }));
    }

    // Simulação de login
    if (email === 'pedro@gmail.com' && password === '123456') {
      return of({ token: 'token_simulado' }).pipe(
        delay(800),
        tap(() => {
          // Reseta as tentativas e armazena o token
          localStorage.removeItem(this.LOGIN_ATTEMPTS_KEY);
          localStorage.removeItem(this.LOCK_TIME_KEY);
          localStorage.setItem(this.AUTH_TOKEN_KEY, 'token_simulado');
          localStorage.setItem(this.USER_KEY, 'true');
        })
      );
    } else {
      // Incrementa as tentativas
      const attempts = parseInt(localStorage.getItem(this.LOGIN_ATTEMPTS_KEY) || '0');
      const newAttempts = attempts + 1;
      localStorage.setItem(this.LOGIN_ATTEMPTS_KEY, newAttempts.toString());

      // Se exceder o máximo de tentativas, bloqueia a conta
      if (newAttempts >= this.MAX_ATTEMPTS) {
        const lockTime = (Date.now() + this.LOCK_DURATION).toString();
        localStorage.setItem(this.LOCK_TIME_KEY, lockTime);
        return throwError(() => ({
          status: 403,
          error: { message: 'Muitas tentativas falhas. Sua conta foi bloqueada temporariamente.' }
        }));
      }

      return throwError(() => ({
        status: 401,
        error: { message: 'Credenciais inválidas. Tentativas restantes: ' + (this.MAX_ATTEMPTS - newAttempts) }
      }));
    }
  }

  loginWithGoogle(): Observable<any> {
    return of({ token: 'google_token_simulado' }).pipe(
      delay(800),
      tap(() => {
        localStorage.setItem(this.AUTH_TOKEN_KEY, 'google_token_simulado');
        localStorage.setItem(this.USER_KEY, 'true');
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  logout(): void {
    // Limpa todos os itens de autenticação
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.LOGIN_ATTEMPTS_KEY);
    localStorage.removeItem(this.LOCK_TIME_KEY);
    
    // Redireciona para login
    this.router.navigate(['/login']);
  }

isAccountLocked(): boolean {
  const lockTime = localStorage.getItem(this.LOCK_TIME_KEY);
  if (!lockTime) {
    return false;
  }
  return Date.now() < parseInt(lockTime, 10);
}
  getRemainingLockTime(): number {
    const lockTime = parseInt(localStorage.getItem(this.LOCK_TIME_KEY) || '0');
    return Math.max(0, lockTime - Date.now());
  }
}