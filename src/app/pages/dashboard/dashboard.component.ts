import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
export class DashboardComponent {
  activeMenu: string = 'reminders';
  newReminder = { titulo: '', descricao: '' };
  editingReminder: any = null;
  reminders: any[] = [];
  dateControl = new FormControl(new Date());
  editDateControl = new FormControl(new Date());

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

  createReminder() {
    // Implementar lógica de criação
  }

  startEdit(reminder: any) {
    this.editingReminder = {...reminder};
  }

  saveEdit() {
    // Implementar lógica de edição
  }

  cancelEdit() {
    this.editingReminder = null;
  }

  deleteReminder(reminder: any) {
    // Implementar lógica de exclusão
  }

  logout() {
    // Implementar logout
  }
}