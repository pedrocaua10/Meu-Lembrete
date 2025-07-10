import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LembreteService } from '../../services/lembrete.service';
import { Lembrete } from '../../models/lembrete.model';

@Component({
  selector: 'app-lembrete-editor',
  templateUrl: './lembrete-editor.component.html',
  styleUrls: ['./lembrete-editor.component.scss']
})
export class LembreteEditorComponent implements OnInit {
  lembreteId: string | null = null;
  lembrete: Lembrete | null = null;

  constructor(
    private route: ActivatedRoute,
    private lembreteService: LembreteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lembreteId = this.route.snapshot.paramMap.get('id');
    
    if (this.lembreteId) {
      this.carregarLembrete();
    }
  }

  carregarLembrete(): void {
    if (!this.lembreteId) return;
    
    this.lembreteService.getLembrete(this.lembreteId).subscribe({
      next: (lembrete: Lembrete) => {
        this.lembrete = lembrete;
      },
      error: (err: any) => {
        console.error('Erro ao carregar lembrete:', err);
      }
    });
  }

  salvarLembrete(lembreteData: Omit<Lembrete, 'id'>): void {
    if (this.lembreteId) {
      this.lembreteService.atualizarLembrete({
        ...lembreteData,
        id: this.lembreteId
      }).subscribe({
        next: () => {
          this.router.navigate(['/edicao-sucesso']);
        },
        error: (err: any) => {
          console.error('Erro ao atualizar lembrete:', err);
        }
      });
    } else {
      this.lembreteService.criarLembrete(lembreteData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Erro ao criar lembrete:', err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']);
  }
}