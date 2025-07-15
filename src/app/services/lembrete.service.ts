import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lembrete } from '../models/lembrete.model';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {
  private apiUrl = 'http://localhost:3000/lembretes';
  private editModeSubject = new BehaviorSubject<string>('');
  editMode$ = this.editModeSubject.asObservable();

  constructor(private http: HttpClient) { }

  setEditMode(mode: string): void {
    this.editModeSubject.next(mode);
  }

  clearEditMode(): void {
    this.editModeSubject.next('');
  }

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