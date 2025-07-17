import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lembrete } from '../../models/lembrete.model';

@Component({
  selector: 'app-lembrete-form',
  templateUrl: './lembrete-form.component.html',
  styleUrls: ['./lembrete-form.component.scss']
})
export class LembreteFormComponent implements OnChanges {
  @Input() lembrete: Lembrete | null = null;
  @Output() submit = new EventEmitter<Lembrete>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  prioridades = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'media', label: 'Média' },
    { value: 'alta', label: 'Alta' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      data: [new Date(), Validators.required],
      prioridade: ['media', Validators.required],
      concluido: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lembrete'] && this.lembrete) {
      this.form.patchValue(this.lembrete);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this.form.value as Lembrete);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}