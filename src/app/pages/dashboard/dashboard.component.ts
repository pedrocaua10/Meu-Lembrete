import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeMenu: string = 'reminders';
  newReminder = { 
    titulo: '', 
    descricao: '', 
    prioridade: 'normal',
    hora: '12:00' // Valor padrão
  };
  editingReminder: any = null;
  reminders: any[] = [];
  dateControl = new FormControl(new Date());
  editDateControl = new FormControl(new Date());

  // Calendário
  currentDate = new Date();
  weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
  calendarDays: Date[] = [];
  
  // Modos de visualização
  viewMode: 'day' | 'week' | 'month' = 'month';
  currentDay = new Date();
  currentWeekDays: Date[] = [];
  
  // Filtros
  searchTerm: string = '';
  filteredReminders: any[] = [];

  constructor(
  private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.generateCalendarDays();
    this.generateWeekDays();
    this.loadReminders();
    this.filterReminders();
  }

  loadReminders() {
    const savedReminders = localStorage.getItem('lembretes');
    if (savedReminders) {
      this.reminders = JSON.parse(savedReminders).map((r: any) => ({
        ...r,
        data: new Date(r.data)
      }));
    } else {
      // Dados de exemplo
      this.reminders = [
        {
          id: '1',
          titulo: 'Reunião com cliente',
          descricao: 'Discutir requisitos do projeto',
          data: new Date(new Date().setHours(10, 0, 0, 0)),
          prioridade: 'importante',
          hora: '10:00'
        },
        {
          id: '2',
          titulo: 'Entrega de relatório',
          descricao: 'Enviar relatório mensal para o gerente',
          data: new Date(new Date().setHours(15, 30, 0, 0)),
          prioridade: 'medio',
          hora: '15:30'
        },
        {
          id: '3',
          titulo: 'Atualizar documentação',
          descricao: 'Atualizar documentação do projeto no Confluence',
          data: new Date(new Date().setHours(9, 0, 0, 0)),
          prioridade: 'normal',
          hora: '09:00'
        },
        {
          id: '4',
          titulo: 'Aniversário',
          descricao: 'Meu Aniversário',
          data: new Date(new Date().setHours(0, 0, 0, 0)),
          prioridade: 'importante',
          hora: '00:00'
        },
        {
          id: '5',
          titulo: 'Faculdade',
          descricao: 'Estudar para prova',
          data: new Date(new Date().setDate(new Date().getDate() + 2)),
          prioridade: 'medio',
          hora: '14:00'
        },
        {
          id: '6',
          titulo: 'Jogo',
          descricao: 'Amistoso UCB',
          data: new Date(new Date().setDate(new Date().getDate() + 3)),
          prioridade: 'normal',
          hora: '16:00'
        },
        {
          id: '7',
          titulo: 'Prova',
          descricao: 'Prova Estatística',
          data: new Date(new Date().setDate(new Date().getDate() + 5)),
          prioridade: 'importante',
          hora: '09:30'
        }
      ];
      this.saveReminders();
    }
  }

  saveReminders() {
    localStorage.setItem('lembretes', JSON.stringify(this.reminders));
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dias da semana (0 = domingo, 1 = segunda, etc.)
    const startDayOfWeek = firstDay.getDay();
    
    // Ajuste para começar na segunda-feira
    const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    this.calendarDays = [];
    
    // Adiciona dias do mês anterior (se necessário)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      this.calendarDays.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    
    // Adiciona dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
    
    // Adiciona dias do próximo mês (se necessário)
    const totalCells = 42; // 6 semanas
    const remaining = totalCells - this.calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      this.calendarDays.push(new Date(year, month + 1, i));
    }
  }

  generateWeekDays() {
    this.currentWeekDays = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    
    // Ajusta para começar na segunda-feira
    startDate.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      this.currentWeekDays.push(date);
    }
  }

  hasReminder(day: Date): boolean {
    return this.reminders.some(reminder => {
      const reminderDate = new Date(reminder.data);
      return this.isSameDay(reminderDate, day);
    });
  }

  getRemindersForDay(day: Date): any[] {
    return this.reminders.filter(reminder => {
      const reminderDate = new Date(reminder.data);
      return this.isSameDay(reminderDate, day);
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isCurrentDay(day: Date): boolean {
    const today = new Date();
    return this.isSameDay(day, today);
  }

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  setViewMode(mode: 'day' | 'week' | 'month') {
    this.viewMode = mode;
    if (mode === 'week') {
      this.generateWeekDays();
    }
  }

  viewReminderDetails(reminder: any) {
    this.currentDay = new Date(reminder.data);
    this.viewMode = 'day';
  }

  filterReminders() {
    if (!this.searchTerm) {
      this.filteredReminders = [...this.reminders];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredReminders = this.reminders.filter(reminder => 
        reminder.titulo.toLowerCase().includes(term) || 
        reminder.descricao.toLowerCase().includes(term)
      );
    }
  }

  selectMenu(menu: string) {
    this.activeMenu = menu;
  }

  getMenuTitle(): string {
    switch(this.activeMenu) {
      case 'create': return 'Criar Lembrete';
      case 'edit': return 'Editar Lembrete';
      case 'delete': return 'Excluir Lembrete';
      default: return 'Meus Lembretes';
    }
  }

  setPriority(priority: string) {
    this.newReminder.prioridade = priority;
  }

  createReminder() {
    if (!this.newReminder.titulo || !this.dateControl.value || !this.newReminder.hora) {
      this.snackBar.open('Preencha todos os campos obrigatórios', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    
    // Combina data e hora
    const date = new Date(this.dateControl.value);
    const [hours, minutes] = this.newReminder.hora.split(':').map(Number);
    date.setHours(hours, minutes);
    
    const newReminder = {
      ...this.newReminder,
      data: date,
      id: Date.now().toString()
    };
    
    this.reminders.push(newReminder);
    this.saveReminders();
    
    this.newReminder = { 
      titulo: '', 
      descricao: '', 
      prioridade: 'normal',
      hora: '12:00'
    };
    
    this.dateControl.reset(new Date());
    this.activeMenu = 'reminders';
    this.generateCalendarDays();
    
    this.snackBar.open('Lembrete criado com sucesso!', 'Fechar', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  startEdit(reminder: any) {
    this.editingReminder = {...reminder};
    this.editDateControl.setValue(new Date(reminder.data));
    
    // Formata hora para o campo de edição
    const hours = reminder.data.getHours().toString().padStart(2, '0');
    const minutes = reminder.data.getMinutes().toString().padStart(2, '0');
    this.editingReminder.hora = `${hours}:${minutes}`;
    
    this.activeMenu = 'edit';
  }

  saveEdit() {
    if (!this.editingReminder.titulo || !this.editDateControl.value || !this.editingReminder.hora) {
      this.snackBar.open('Preencha todos os campos obrigatórios', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    
    // Combina data e hora
    const date = new Date(this.editDateControl.value);
    const [hours, minutes] = this.editingReminder.hora.split(':').map(Number);
    date.setHours(hours, minutes);
    
    const index = this.reminders.findIndex(r => r.id === this.editingReminder.id);
    if (index !== -1) {
      this.reminders[index] = {
        ...this.editingReminder,
        data: date
      };
      this.saveReminders();
    }
    
    this.editingReminder = null;
    this.activeMenu = 'reminders';
    this.generateCalendarDays();
    
    this.snackBar.open('Lembrete atualizado com sucesso!', 'Fechar', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  cancelEdit() {
    this.editingReminder = null;
    this.activeMenu = 'reminders';
  }

  deleteReminder(reminder: any) {
    this.reminders = this.reminders.filter(r => r.id !== reminder.id);
    this.saveReminders();
    
    if (this.activeMenu === 'edit' && this.editingReminder?.id === reminder.id) {
      this.cancelEdit();
    }
    
    this.generateCalendarDays();
    this.filterReminders();
    
    this.snackBar.open('Lembrete excluído com sucesso!', 'Fechar', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  logout() {
    this.authService.logout();
  }
}