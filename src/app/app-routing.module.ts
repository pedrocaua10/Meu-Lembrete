import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LembreteEditorComponent } from './pages/lembrete-editor/lembrete-editor.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { AuthGuard } from './guards/auth.guard';
import { EdicaoSucessoComponent } from './components/edicao-sucesso/edicao-sucesso.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reset-senha', component: ResetSenhaComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'lembrete/novo', 
    component: LembreteEditorComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'lembrete/editar/:id', 
    component: LembreteEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edicao-sucesso',
    component: EdicaoSucessoComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }