import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lembrete } from '../../models/lembrete.model';

@Component({
  selector: 'app-lembrete-list',
  templateUrl: './lembrete-list.component.html',
  styleUrls: ['./lembrete-list.component.scss']
})
export class LembreteListComponent {
  @Input() lembretes: Lembrete[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}