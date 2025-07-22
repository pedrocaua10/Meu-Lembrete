import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;
  returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Se já autenticado, redireciona para o dashboard
    if (this.authService.isAuthenticated()) {
      this.goToDashboard();
    }

    // Obtém a URL de retorno da query string
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/dashboard';
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) {
    this.markFormGroupTouched(this.loginForm);
    return;
  }

  this.isLoading = true;
  this.errorMessage = null;

  // Simulação de chamada de API (igual ao reset-senha)
  setTimeout(() => {
    this.isLoading = false;
    
    // 1. Armazena o token de autenticação (simulado)
    localStorage.setItem('auth_token', 'token_simulado_' + Date.now());
    
    // 2. Redireciona para o dashboard (igual ao reset-senha redireciona para tela-de-sucesso)
    this.router.navigate(['/tela-de-sucesso'])
      .then(() => {
        console.log('Navegação para o dashboard bem-sucedida!');
      })
      .catch(err => {
        console.error('Erro ao navegar para o dashboard:', err);
        this.errorMessage = 'Erro ao redirecionar após login';
      });
    
    console.log('Login bem-sucedido! Token armazenado.');
  }, 1500);
}
  private handleLoginError(error: any): void {
    console.error('Erro no login:', error);
    
    if (error.status === 401) {
      this.errorMessage = 'Credenciais inválidas';
    } else if (error.status === 0) {
      this.errorMessage = 'Sem conexão com o servidor';
    } else {
      this.errorMessage = 'Erro durante o login. Tente novamente.';
    }
  }

 loginWithGoogle(): void {
  this.isLoading = true;
  this.errorMessage = null;

  // Simulação de chamada de API
  setTimeout(() => {
    this.isLoading = false;
    
    // 1. Armazena o token
    localStorage.setItem('auth_token', 'google_token_simulado_' + Date.now());
    
    // 2. Redireciona
    this.router.navigate(['/tela-de-sucesso']);
    
    console.log('Login com Google bem-sucedido!');
  }, 1500);
}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword(): void {
    this.router.navigate(['/reset-senha']);
  }

  // Novo método para navegação
  goToDashboard(): void {
    console.log('Navegando para o dashboard:', this.returnUrl);
    this.router.navigateByUrl(this.returnUrl)
      .catch(error => {
        console.error('Erro na navegação:', error);
        // Fallback para a rota padrão
        this.router.navigate(['/dashboard']);
      });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}