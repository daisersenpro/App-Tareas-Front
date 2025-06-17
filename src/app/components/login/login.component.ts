import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    // Si ya está autenticado, redirige a la página principal
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.mensajeError = '';
    this.http.post<any>('http://localhost:5190/api/usuarios/login', {
      email: this.email,
      PasswordHash: this.password // <-- ahora con P mayúscula
    }).subscribe({
      next: (usuario) => {
        this.authService.guardarUsuario(usuario);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.mensajeError = 'Email o contraseña incorrectos';
      }
    });
  }
}