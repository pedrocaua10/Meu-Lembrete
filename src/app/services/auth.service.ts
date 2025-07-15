import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = 'https://api.meulembrete.com';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  googleLogin(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/google`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
      
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}