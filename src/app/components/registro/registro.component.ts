import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el AuthService

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  rol: string = 'usuario'; // Valor por defecto
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // Inyecta el AuthService
  ) {
    // Si ya está autenticado, redirige a la página principal
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/']);
    }
  }

  registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    // Llama al endpoint de registro del backend
    this.http.post<any>('http://localhost:5190/api/usuarios/registro', {
      nombre: this.nombre,
      email: this.email,
      PasswordHash: this.password, // <-- ahora con P mayúscula
      rol: this.rol
    }).subscribe({
      next: (res) => {
        this.mensajeExito = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
        // Opcional: Redirigir automáticamente al login después de unos segundos
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.mensajeError = 'Error al registrar usuario: ' + (err.error?.message || JSON.stringify(err.error));
        console.error('Detalles del error:', err);
      }
    });
  }
}