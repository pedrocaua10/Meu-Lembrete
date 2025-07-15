import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
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
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any) => this.handleLoginSuccess(response),
        error: (err: HttpErrorResponse) => this.handleLoginError(err)
      });
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.googleLogin()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: any) => this.handleLoginSuccess(response),
        error: (err: HttpErrorResponse) => this.handleLoginError(err)
      });
  }

  private handleLoginSuccess(response: any): void {
    // Armazena o token no localStorage
    localStorage.setItem('authToken', response.token);
    
    // Obtém a URL de redirecionamento ou usa '/dashboard' como padrão
    const redirectUrl = this.route.snapshot.queryParams['redirectTo'] || '/dashboard';
    
    // Navega para a URL desejada
    this.router.navigateByUrl(redirectUrl)
      .catch(() => this.router.navigate(['/dashboard']));
  }

  private handleLoginError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.errorMessage = 'E-mail ou senha incorretos. Por favor, tente novamente.';
    } else if (error.status === 0) {
      this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
    } else {
      this.errorMessage = error.error?.message || 'Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.';
    }
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