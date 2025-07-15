import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LembreteService } from '../../services/lembrete.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private lembreteService: LembreteService
  ) {}

  prepareToDelete() {
    this.lembreteService.setEditMode('delete');
    this.router.navigate(['/lembrete-list']);
  }

  prepareToEdit() {
    this.lembreteService.setEditMode('edit');
    this.router.navigate(['/lembrete-list']);
  }
}