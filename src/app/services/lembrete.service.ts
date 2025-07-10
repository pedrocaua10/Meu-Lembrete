import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lembrete } from '../models/lembrete.model';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {
  private apiUrl = 'http://localhost:3000/lembretes';

  constructor(private http: HttpClient) { }

  getLembretes(): Observable<Lembrete[]> {
    return this.http.get<Lembrete[]>(this.apiUrl);
  }

  getLembrete(id: string): Observable<Lembrete> {
    return this.http.get<Lembrete>(`${this.apiUrl}/${id}`);
  }

  criarLembrete(lembrete: Omit<Lembrete, 'id'>): Observable<Lembrete> {
    return this.http.post<Lembrete>(this.apiUrl, lembrete);
  }

  atualizarLembrete(lembrete: Lembrete): Observable<Lembrete> {
    return this.http.put<Lembrete>(`${this.apiUrl}/${lembrete.id}`, lembrete);
  }

  excluirLembrete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}