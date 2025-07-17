import { Component, ViewChild } from '@angular/core';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Lembrete } from '../../models/lembrete.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
  imports: [MatListModule]
})
export class DashboardComponent {
  @ViewChild('deleteList') deleteList!: MatSelectionList;
  
  activeMenu: string = 'reminders';
  
  reminders: Lembrete[] = [
    {
      id: '1',
      titulo: 'Reunião com equipe',
      descricao: 'Apresentar os novos recursos do sistema',
      data: new Date('2023-08-15T10:00:00'),
      prioridade: 'media',
      concluido: false,
      usuarioId: 'user1'
    },
    {
      id: '2',
      titulo: 'Entrega de relatório',
      descricao: 'Enviar relatório trimestral para o gerente',
      data: new Date('2023-08-18T15:30:00'),
      prioridade: 'alta',
      concluido: false,
      usuarioId: 'user1'
    }
  ];

  editingReminder: Lembrete | null = null;
  newReminder: Omit<Lembrete, 'id' | 'concluido'> = {
    titulo: '',
    descricao: '',
    data: new Date(),
    prioridade: 'media',
    usuarioId: 'user1'
  };

  dateControl = new FormControl(new Date());
  editDateControl = new FormControl(new Date());

  constructor(
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  selectMenu(menu: string): void {
    this.activeMenu = menu;
    this.editingReminder = null;
  }

  getMenuTitle(): string {
    switch (this.activeMenu) {
      case 'create': return 'Criar Lembrete';
      case 'edit': return 'Editar Lembrete';
      case 'delete': return 'Excluir Lembrete';
      case 'reminders': return 'Lembretes';
      default: return 'Dashboard';
    }
  }

  createReminder(): void {
  if (this.newReminder.titulo && this.dateControl.value) {
    const newReminder: Lembrete = {
      id: Date.now().toString(),  // Gera um ID único baseado no timestamp
      ...this.newReminder,
      data: this.dateControl.value,
      concluido: false
    };
    
    this.reminders.push(newReminder);
    
    // Reset form
    this.newReminder = {
      titulo: '',
      descricao: '',
      data: new Date(),
      prioridade: 'media',
      usuarioId: 'user1'
    };
    this.dateControl.setValue(new Date());
  }
}

  startEdit(reminder: any): void {
    this.editingReminder = {...reminder};
    this.editDateControl.setValue(new Date(reminder.date));
    this.activeMenu = 'edit';
  }


  saveEdit(): void {
    if (this.editingReminder && this.editDateControl.value) {
      const updatedReminder: Lembrete = {
        ...this.editingReminder,
        data: this.editDateControl.value
      };
      
      const index = this.reminders.findIndex(r => r.id === updatedReminder.id);
      if (index !== -1) {
        this.reminders[index] = updatedReminder;
      }
      this.editingReminder = null;
    }
  }
  cancelEdit(): void {
    this.editingReminder = null;
  }

  deleteReminder(reminder: any): void {
    this.reminders = this.reminders.filter(r => r.id !== reminder.id);
  }

  logout(): void {
    this.authService.logout();
  }
 formatDate(date: Date): string {
    return this.datePipe.transform(date, 'short') || '';
  }

  hasSelection(): boolean {
    return this.deleteList?.selectedOptions?.hasValue() || false;
  }

  getSelectedReminder(): Lembrete | null {
    if (this.deleteList?.selectedOptions?.selected[0]?.value) {
      return this.deleteList.selectedOptions.selected[0].value;
    }
    return null;
  }
}