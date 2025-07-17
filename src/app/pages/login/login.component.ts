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
      this.router.navigate(['/dashboard']);
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

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(credentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          // REDIRECIONA PARA A URL DE RETORNO APÓS LOGIN BEM-SUCEDIDO
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error: any) => {
          this.handleLoginError(error);
        }
      });
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

    this.authService.googleLogin()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          // REDIRECIONA PARA A URL DE RETORNO APÓS LOGIN COM GOOGLE
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err: any) => {
          this.handleLoginError(err);
        }
      });
  
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword(): void {
    this.router.navigate(['/reset-senha']);
  }

  goToRegister(): void {
    this.router.navigate(['/registro']);
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