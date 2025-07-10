import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Credenciais {
  email: string;
  senha: string;
}

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginWithGoogle() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(credenciais: Credenciais, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciais);
  }

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }

  resetSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-senha`, { email });
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }
}