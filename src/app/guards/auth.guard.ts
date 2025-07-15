import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  try {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    return this.router.createUrlTree(['/login'], {
      queryParams: { redirectTo: this.router.url }
    });
  } catch (error) {
    console.error('AuthGuard error:', error);
    return this.router.createUrlTree(['/login']);
  }
}
}