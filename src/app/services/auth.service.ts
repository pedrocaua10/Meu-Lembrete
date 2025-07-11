import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

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
  private apiUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth  // Injetar o AngularFireAuth
  ) { }

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

  // Implementação correta do login com Google
  loginWithGoogle(): Observable<firebase.auth.UserCredential> {
    return new Observable(observer => {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((credential) => {
          observer.next(credential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}