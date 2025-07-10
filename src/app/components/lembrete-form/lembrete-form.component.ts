import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lembrete } from '../../models/lembrete.model';

@Component({
  selector: 'app-lembrete-form',
  templateUrl: './lembrete-form.component.html',
  styleUrls: ['./lembrete-form.component.scss']
})
export class LembreteFormComponent implements OnInit {
  @Input() lembrete: Lembrete | null = null;
  @Output() submit = new EventEmitter<Omit<Lembrete, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  lembreteForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.lembreteForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      data: [null, Validators.required],
      prioridade: ['media', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.lembrete) {
      this.isEditMode = true;
      this.lembreteForm.patchValue({
        titulo: this.lembrete.titulo,
        descricao: this.lembrete.descricao,
        data: this.lembrete.data,
        prioridade: this.lembrete.prioridade
      });
    }
  }

  onSubmit(): void {
    if (this.lembreteForm.valid) {
      const formValue = this.lembreteForm.value;
      const lembreteData: Omit<Lembrete, 'id'> = {
        titulo: formValue.titulo,
        descricao: formValue.descricao,
        data: formValue.data,
        prioridade: formValue.prioridade,
        concluido: false,
        usuarioId: '1' // Substituir pelo ID do usuário real
      };
      this.submit.emit(lembreteData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}