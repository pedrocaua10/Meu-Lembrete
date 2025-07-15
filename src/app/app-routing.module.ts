import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { SucessoComponent } from './pages/tela-de-sucesso/sucesso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona para login
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
{ path: 'reset-senha', component: ResetSenhaComponent },
  { path: 'tela-de-sucesso', component: SucessoComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }