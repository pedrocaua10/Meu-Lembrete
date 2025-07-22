import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;
  returnUrl: string = '/dashboard';
  lockCountdown: string | null = null;
  private countdownSubscription: Subscription | null = null;

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

    // Verifica se a conta está bloqueada ao iniciar
    this.checkAccountLock();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    if (this.authService.isAccountLocked()) {
      this.startCountdown();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 403) {
          this.startCountdown();
        } else if (error.status === 401) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Erro durante o login. Tente novamente.';
        }
      }
    });
  }

  loginWithGoogle(): void {
    if (this.authService.isAccountLocked()) {
      this.startCountdown();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 403) {
          this.startCountdown();
        } else {
          this.errorMessage = 'Erro ao fazer login com o Google.';
        }
      }
    });
  }

  private checkAccountLock(): void {
    if (this.authService.isAccountLocked()) {
      this.startCountdown();
    }
  }

  private startCountdown(): void {
    this.errorMessage = 'Muitas tentativas falhas. Sua conta foi bloqueada temporariamente.';

    // Inicia o contador regressivo
    const remainingTime = this.authService.getRemainingLockTime();
    let seconds = Math.ceil(remainingTime / 1000);

    this.updateCountdown(seconds);

    this.countdownSubscription = timer(0, 1000).subscribe(() => {
      seconds -= 1;

      if (seconds <= 0) {
        this.lockCountdown = null;
        this.errorMessage = null;
        this.countdownSubscription?.unsubscribe();
      } else {
        this.updateCountdown(seconds);
      }
    });
  }

  private updateCountdown(seconds: number): void {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.lockCountdown = `Tente novamente em ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword(): void {
    this.router.navigate(['/reset-senha']);
  }

  goToDashboard(): void {
    this.router.navigateByUrl(this.returnUrl);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
  }
}