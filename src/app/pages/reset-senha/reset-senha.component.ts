import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  email: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.email = history.state.email || '';
    
    this.resetForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) return;
    
    const { email, password } = this.resetForm.value;
    
    if (this.authService['updatePassword'](email, password)) {
      this.snackBar.open('Senha atualizada com sucesso!', 'Fechar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/login']);
    } else {
      this.snackBar.open('Email não encontrado', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}