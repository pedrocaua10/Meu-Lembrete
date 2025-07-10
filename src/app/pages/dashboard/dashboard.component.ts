import { Component, OnInit } from '@angular/core';
import { LembreteService } from '../../services/lembrete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lembretes: any[] = [];
  currentView = 'semana';

  constructor(
    private lembreteService: LembreteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarLembretes();
  }

  carregarLembretes(): void {
    this.lembreteService.getLembretes().subscribe({
      next: (lembretes) => this.lembretes = lembretes,
      error: (err) => console.error('Erro ao carregar lembretes:', err)
    });
  }

  novoLembrete(): void {
    this.router.navigate(['/lembrete/novo']);
  }

  editarLembrete(id: string): void {
    this.router.navigate(['/lembrete/editar', id]);
  }

  excluirLembrete(id: string): void {
    this.lembreteService.excluirLembrete(id).subscribe({
      next: () => this.carregarLembretes(),
      error: (err) => console.error('Erro ao excluir lembrete:', err)
    });
  }

  changeView(view: string): void {
    this.currentView = view;
    // Lógica para mudar visualização
  }
}