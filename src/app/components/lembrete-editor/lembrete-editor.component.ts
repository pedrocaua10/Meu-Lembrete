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
  lembrete: Lembrete = {
    id: '',
    titulo: '',
    descricao: '',
    data: new Date(),
    prioridade: 'media',
    concluido: false,
    usuarioId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private lembreteService: LembreteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lembreteId = this.route.snapshot.paramMap.get('id');
    
    if (this.lembreteId) {
      this.carregarLembrete(this.lembreteId);
    }
  }

  carregarLembrete(id: string): void {
    this.lembreteService.getLembrete(id).subscribe({
      next: (lembrete: Lembrete) => {
        this.lembrete = lembrete;
      },
      error: (err: any) => {
        console.error('Erro ao carregar lembrete:', err);
      }
    });
  }

  salvarLembrete(lembreteData: Lembrete): void {
    if (this.lembreteId) {
      this.lembreteService.atualizarLembrete({
        ...lembreteData,
        id: this.lembreteId
      }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
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